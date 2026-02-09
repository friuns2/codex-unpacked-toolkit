# Codex.app Reverse-Engineered Source (Local Reconstruction)

This folder contains a best-effort reconstruction of `/Applications/Codex.app/Contents/Resources/app.asar`.

## Output layout

- `raw/`: direct extraction of `app.asar` (unmodified)
- `readable/`: reconstructed tree with formatted JS and guessed identifier names
- `meta/rename-map.json`: per-file variable rename map (obfuscated alias -> guessed name)
- `meta/rebuild-stats.json`: reconstruction stats
- `meta/rebuild-readable.mjs`: reconstruction script used

## What was done

1. Extracted `app.asar` into `raw/`.
2. Recreated the same structure in `readable/`.
3. Applied AST-based identifier recovery for obfuscated `require(...)` aliases.
4. Formatted JS/JSON/HTML/CSS/MD using Prettier for readability.

## Recovery summary

- Processed JS files: `479`
- Files with guessed renames: `17`
- Total guessed renames: `111`
- Parse failures: `0`

## Notes / limits

- No source maps were present, so original TypeScript filenames/symbol names cannot be fully recovered.
- Guessed names are conservative and focused on module-import aliases (safe to infer).
- Native binaries (`*.node`, helper executables) are included as binaries only; exact original source for those cannot be reconstructed from `app.asar` alone.
