#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

import parserPkg from "@babel/parser";
import traversePkg from "@babel/traverse";
import generatorPkg from "@babel/generator";

const { parse } = parserPkg;
const traverse = traversePkg.default;
const generate = generatorPkg.default;

const ROOT = process.cwd();
const READABLE_DIR = path.join(ROOT, "codex_reverse", "readable");
const MAP_PATH = path.join(ROOT, "codex_reverse", "meta", "rename-map.json");
const STATS_PATH = path.join(ROOT, "codex_reverse", "meta", "rebuild-stats.json");

const RESERVED = new Set([
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

const MODULE_ALIASES = {
  electron: "electron",
  fs: "fs",
  "node:fs": "fs",
  "node:fs/promises": "fsPromises",
  path: "path",
  "node:path": "path",
  https: "https",
  stream: "stream",
  events: "events",
  buffer: "buffer",
  util: "util",
  "node:util": "util",
  "node:string_decoder": "stringDecoder",
  "child_process": "childProcess",
  "node:child_process": "childProcess",
  tty: "tty",
  net: "net",
  "node:net": "net",
  "node:url": "url",
  url: "url",
  os: "os",
  "node:os": "os",
  crypto: "crypto",
  "node:crypto": "crypto",
  "node:zlib": "zlib",
  zlib: "zlib",
  "node:process": "process",
  "worker_threads": "workerThreads",
  "node:worker_threads": "workerThreads",
  "diagnostics_channel": "diagnosticsChannel",
  "node:diagnostics_channel": "diagnosticsChannel",
  perf_hooks: "perfHooks",
  async_hooks: "asyncHooks",
  module: "nodeModule",
  readline: "readline",
  "node:readline": "readline",
};

const PARSER_OPTIONS = {
  sourceType: "unambiguous",
  allowAwaitOutsideFunction: true,
  allowReturnOutsideFunction: true,
  allowImportExportEverywhere: true,
  plugins: [
    "jsx",
    "typescript",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    "dynamicImport",
    "importMeta",
    "topLevelAwait",
    "optionalChaining",
    "nullishCoalescingOperator",
    "objectRestSpread",
    "numericSeparator",
    "logicalAssignment",
    "exportDefaultFrom",
    "exportNamespaceFrom",
    "asyncGenerators",
  ],
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function toCamelCase(value) {
  const parts = value
    .split("_")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return value;
  }

  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/^[A-Z]/, (c) => c.toLowerCase());
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

function normalizeModuleName(moduleName) {
  if (MODULE_ALIASES[moduleName]) {
    return MODULE_ALIASES[moduleName];
  }

  const withoutNodePrefix = moduleName.replace(/^node:/, "");
  if (MODULE_ALIASES[withoutNodePrefix]) {
    return MODULE_ALIASES[withoutNodePrefix];
  }

  let candidate = withoutNodePrefix;
  if (candidate.startsWith("@")) {
    const parts = candidate.split("/").filter(Boolean);
    candidate = parts.slice(-2).join("_").replace(/^@/, "");
  } else {
    const parts = candidate.split("/").filter(Boolean);
    candidate = parts[parts.length - 1] ?? candidate;
  }

  candidate = candidate.replace(/\.(?:[cm])?js$/i, "");
  candidate = candidate.replace(/[^A-Za-z0-9_$]+/g, "_");
  candidate = toCamelCase(candidate);

  if (!candidate) {
    candidate = "moduleRef";
  }

  if (/^\d/.test(candidate)) {
    candidate = `_${candidate}`;
  }

  if (RESERVED.has(candidate)) {
    candidate = `${candidate}Module`;
  }

  if (candidate.length === 1) {
    candidate = `${candidate}Module`;
  }

  return candidate;
}

function isIdentifier(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);
}

function makeUnique(baseName, oldName, usedNames) {
  let candidate = baseName;

  if (!isIdentifier(candidate)) {
    candidate = "moduleRef";
  }

  if (candidate === oldName) {
    return candidate;
  }

  let i = 2;
  while (usedNames.has(candidate) && candidate !== oldName) {
    candidate = `${baseName}${i}`;
    i += 1;
  }
  return candidate;
}

function isRequireCall(initPath) {
  if (!initPath || !initPath.isCallExpression()) {
    return false;
  }

  const callee = initPath.get("callee");
  const args = initPath.get("arguments");

  return (
    callee.isIdentifier({ name: "require" }) &&
    args.length === 1 &&
    args[0].isStringLiteral()
  );
}

async function main() {
  const allFiles = await walk(READABLE_DIR);
  const jsFiles = allFiles.filter((file) => file.endsWith(".js"));

  const renameMap = {};
  const parseErrors = {};

  let totalRenames = 0;
  let changedFiles = 0;

  for (const filePath of jsFiles) {
    const relativePath = path.relative(READABLE_DIR, filePath);
    const source = await fs.readFile(filePath, "utf8");

    let ast;
    try {
      ast = parse(source, PARSER_OPTIONS);
    } catch (error) {
      parseErrors[relativePath] = String(error.message || error);
      continue;
    }

    const renameRecords = [];

    traverse(ast, {
      Program(programPath) {
        const usedNames = new Set(Object.keys(programPath.scope.bindings));
        const plannedRenames = [];

        for (const statementPath of programPath.get("body")) {
          if (!statementPath.isVariableDeclaration()) {
            continue;
          }

          for (const declarationPath of statementPath.get("declarations")) {
            const idPath = declarationPath.get("id");
            const initPath = declarationPath.get("init");

            if (!idPath.isIdentifier() || !isRequireCall(initPath)) {
              continue;
            }

            const oldName = idPath.node.name;
            const moduleName = initPath.get("arguments")[0].node.value;
            const guessedName = normalizeModuleName(moduleName);
            const newName = makeUnique(guessedName, oldName, usedNames);

            if (newName === oldName) {
              continue;
            }

            usedNames.add(newName);
            plannedRenames.push({ oldName, newName, moduleName });
          }
        }

        for (const rename of plannedRenames) {
          if (!programPath.scope.hasBinding(rename.oldName)) {
            continue;
          }

          try {
            programPath.scope.rename(rename.oldName, rename.newName);
            renameRecords.push(rename);
          } catch {
            // Skip a rename if Babel rejects it for this scope.
          }
        }
      },
    });

    if (renameRecords.length === 0) {
      continue;
    }

    const output = generate(ast, {
      comments: true,
      compact: false,
      minified: false,
      jsescOption: { minimal: true },
    }).code;

    await fs.writeFile(filePath, output + "\n", "utf8");

    renameMap[relativePath] = renameRecords;
    totalRenames += renameRecords.length;
    changedFiles += 1;
  }

  await fs.writeFile(MAP_PATH, JSON.stringify(renameMap, null, 2) + "\n", "utf8");
  await fs.writeFile(
    STATS_PATH,
    JSON.stringify(
      {
        processedJsFiles: jsFiles.length,
        changedFiles,
        totalRenames,
        parseErrorCount: Object.keys(parseErrors).length,
        parseErrors,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        processedJsFiles: jsFiles.length,
        changedFiles,
        totalRenames,
        parseErrorCount: Object.keys(parseErrors).length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
