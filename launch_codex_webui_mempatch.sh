#!/usr/bin/env bash
set -euo pipefail

# Runtime "memory-style" patch launcher for Codex.app:
# - Leaves /Applications/Codex.app untouched.
# - Clones app to a temp dir.
# - Extracts and patches app.asar contents in the clone.
# - Rebuilds app.asar so native modules still resolve via app.asar.unpacked.
# - Copies known-good patched WebUI files.
# - Launches cloned app with --webui.

APP_PATH="/Applications/Codex.app"
PATCH_BASE="/Users/igor/temp/untitled folder 67/codex_reverse/readable"
DEFAULT_ELECTRON_BIN="/Users/igor/temp/untitled folder 67/codex_reverse/meta/electron-runner/node_modules/.bin/electron"
ELECTRON_BIN="${CODEX_ELECTRON_BIN:-$DEFAULT_ELECTRON_BIN}"
PATCH_DEPS_DIR="${CODEX_WEBUI_PATCH_DEPS:-$HOME/.cache/codex-webui-patch-deps}"
PORT="${CODEX_WEBUI_PORT:-4310}"
REMOTE=0
TOKEN=""
OPEN_BROWSER=1
KEEP_TEMP=0
DRY_RUN=0
USER_DATA_DIR=""

EXTRA_ARGS=()

usage() {
  cat <<'EOF'
Usage:
  launch_codex_webui_mempatch.sh [options] [-- <extra codex args>]

Options:
  --app <path>         Codex.app path (default: /Applications/Codex.app)
  --patch-base <path>  Patched readable source path
  --electron <path>    Electron binary used to launch patched app
  --deps-dir <path>    Cache dir for patch-time npm deps (ws, mime-types)
  --port <n>           WebUI port (default: 4310)
  --user-data-dir <p>  Chromium user-data-dir for isolated runtime profile
  --remote             Bind 0.0.0.0 and keep strict ws limits
  --token <value>      WebUI auth token for remote mode
  --no-open            Do not auto-open browser
  --keep-temp          Keep temp patched app directory
  --dry-run            Prepare patched clone, print launch command, do not start app
  -h, --help           Show this help
EOF
}

while (($#)); do
  case "$1" in
    --app)
      APP_PATH="${2:?missing value for --app}"
      shift 2
      ;;
    --patch-base)
      PATCH_BASE="${2:?missing value for --patch-base}"
      shift 2
      ;;
    --electron)
      ELECTRON_BIN="${2:?missing value for --electron}"
      shift 2
      ;;
    --deps-dir)
      PATCH_DEPS_DIR="${2:?missing value for --deps-dir}"
      shift 2
      ;;
    --port)
      PORT="${2:?missing value for --port}"
      shift 2
      ;;
    --user-data-dir)
      USER_DATA_DIR="${2:?missing value for --user-data-dir}"
      shift 2
      ;;
    --remote)
      REMOTE=1
      shift
      ;;
    --token)
      TOKEN="${2:?missing value for --token}"
      shift 2
      ;;
    --no-open)
      OPEN_BROWSER=0
      shift
      ;;
    --keep-temp)
      KEEP_TEMP=1
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      EXTRA_ARGS+=("$@")
      break
      ;;
    *)
      EXTRA_ARGS+=("$1")
      shift
      ;;
  esac
done

if [[ ! -d "$APP_PATH" ]]; then
  echo "Error: app not found: $APP_PATH" >&2
  exit 1
fi
if [[ ! -d "$PATCH_BASE" ]]; then
  echo "Error: patch base not found: $PATCH_BASE" >&2
  exit 1
fi
if [[ ! -x "$ELECTRON_BIN" ]]; then
  if command -v electron >/dev/null 2>&1; then
    ELECTRON_BIN="$(command -v electron)"
  else
    echo "Error: electron binary not found/executable: $ELECTRON_BIN" >&2
    exit 1
  fi
fi
if [[ ! -f "$PATCH_BASE/.vite/build/main.js" ]]; then
  echo "Error: patch base missing .vite/build/main.js: $PATCH_BASE" >&2
  exit 1
fi
if [[ ! -f "$PATCH_BASE/webview/index.html" ]]; then
  echo "Error: patch base missing webview/index.html: $PATCH_BASE" >&2
  exit 1
fi
if [[ ! -f "$PATCH_BASE/webview/webui-bridge.js" ]]; then
  echo "Error: patch base missing webview/webui-bridge.js: $PATCH_BASE" >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required to provision webui patch deps (ws)." >&2
  exit 1
fi

if [[ ! -d "$PATCH_DEPS_DIR/node_modules/ws" || ! -d "$PATCH_DEPS_DIR/node_modules/mime-types" || ! -d "$PATCH_DEPS_DIR/node_modules/mime-db" ]]; then
  echo "Preparing patch dependency cache in: $PATCH_DEPS_DIR"
  mkdir -p "$PATCH_DEPS_DIR"
  if [[ ! -f "$PATCH_DEPS_DIR/package.json" ]]; then
    cat >"$PATCH_DEPS_DIR/package.json" <<'EOF'
{
  "name": "codex-webui-patch-deps",
  "private": true
}
EOF
  fi
  npm --prefix "$PATCH_DEPS_DIR" install --no-audit --no-fund ws mime-types >/dev/null
fi

WORKDIR="$(mktemp -d "${TMPDIR:-/tmp}/codex-webui-mempatch.XXXXXX")"
RUN_APP="$WORKDIR/Codex.app"
RUN_RES="$RUN_APP/Contents/Resources"

cleanup() {
  if [[ "$KEEP_TEMP" -eq 0 ]]; then
    rm -rf "$WORKDIR"
  else
    echo "Kept temp dir: $WORKDIR"
  fi
}
trap cleanup EXIT

echo "Creating runtime clone in: $WORKDIR"
if ! cp -cR "$APP_PATH" "$RUN_APP" 2>/dev/null; then
  cp -R "$APP_PATH" "$RUN_APP"
fi

if [[ ! -f "$RUN_RES/app.asar" ]]; then
  echo "Error: cloned app missing app.asar: $RUN_RES/app.asar" >&2
  exit 1
fi

PATCHED_ASAR_ROOT="$WORKDIR/app.asar.patched"
PATCHED_ASAR_FILE="$RUN_RES/app.asar.patched"
if [[ -z "$USER_DATA_DIR" ]]; then
  USER_DATA_DIR="$WORKDIR/user-data"
fi

echo "Extracting app.asar..."
npx -y @electron/asar extract "$RUN_RES/app.asar" "$PATCHED_ASAR_ROOT"

target_main_js_rel="$(sed -nE 's@.*(main-[A-Za-z0-9_-]+\.js).*@\1@p' "$PATCHED_ASAR_ROOT/.vite/build/main.js" | head -n1 || true)"
source_main_js_rel="$(sed -nE 's@.*(main-[A-Za-z0-9_-]+\.js).*@\1@p' "$PATCH_BASE/.vite/build/main.js" | head -n1 || true)"
if [[ -z "$target_main_js_rel" || -z "$source_main_js_rel" ]]; then
  echo "Error: failed to resolve hashed main bundle names" >&2
  exit 1
fi

target_renderer_js_rel="$(sed -nE 's@.*assets/(index-[A-Za-z0-9_-]+\.js).*@\1@p' "$PATCHED_ASAR_ROOT/webview/index.html" | head -n1 || true)"
source_renderer_js_rel="$(sed -nE 's@.*assets/(index-[A-Za-z0-9_-]+\.js).*@\1@p' "$PATCH_BASE/webview/index.html" | head -n1 || true)"
if [[ -z "$target_renderer_js_rel" || -z "$source_renderer_js_rel" ]]; then
  echo "Error: failed to resolve hashed renderer bundle names" >&2
  exit 1
fi

echo "Applying runtime patches..."
cp "$PATCH_BASE/.vite/build/$source_main_js_rel" "$PATCHED_ASAR_ROOT/.vite/build/$target_main_js_rel"
cp "$PATCH_BASE/webview/assets/$source_renderer_js_rel" "$PATCHED_ASAR_ROOT/webview/assets/$target_renderer_js_rel"
cp "$PATCH_BASE/webview/webui-bridge.js" "$PATCHED_ASAR_ROOT/webview/webui-bridge.js"

mkdir -p "$PATCHED_ASAR_ROOT/node_modules"
cp -R "$PATCH_DEPS_DIR/node_modules/ws" "$PATCHED_ASAR_ROOT/node_modules/ws"
cp -R "$PATCH_DEPS_DIR/node_modules/mime-types" "$PATCHED_ASAR_ROOT/node_modules/mime-types"
cp -R "$PATCH_DEPS_DIR/node_modules/mime-db" "$PATCHED_ASAR_ROOT/node_modules/mime-db"

if ! rg -q -- '--webui' "$PATCHED_ASAR_ROOT/.vite/build/$target_main_js_rel"; then
  echo "Error: patched main bundle does not contain --webui parser" >&2
  exit 1
fi
if ! rg -q 'message-for-view' "$PATCHED_ASAR_ROOT/webview/webui-bridge.js"; then
  echo "Error: patched web bridge looks invalid" >&2
  exit 1
fi
if [[ ! -f "$PATCHED_ASAR_ROOT/node_modules/ws/package.json" ]]; then
  echo "Error: failed to stage ws dependency into patched app.asar root" >&2
  exit 1
fi

echo "Repacking app.asar..."
npx -y @electron/asar pack "$PATCHED_ASAR_ROOT" "$PATCHED_ASAR_FILE"
mv "$RUN_RES/app.asar" "$RUN_RES/app.asar.orig"
mv "$PATCHED_ASAR_FILE" "$RUN_RES/app.asar"

CLI_PATH="$RUN_RES/codex"
if [[ ! -x "$CLI_PATH" ]]; then
  echo "Error: codex CLI binary missing in cloned app: $CLI_PATH" >&2
  exit 1
fi

APP_ENTRY="$RUN_RES/app.asar"
CMD=("$ELECTRON_BIN" "--user-data-dir=$USER_DATA_DIR" "$APP_ENTRY" "--webui" "--port" "$PORT")
if [[ "$REMOTE" -eq 1 ]]; then
  CMD+=("--remote")
fi
if [[ -n "$TOKEN" ]]; then
  CMD+=("--token" "$TOKEN")
fi
if ((${#EXTRA_ARGS[@]})); then
  CMD+=("${EXTRA_ARGS[@]}")
fi

echo "Runtime-patched app: $RUN_APP"
echo "Electron binary: $ELECTRON_BIN"
echo "App entry: $APP_ENTRY"
echo "User data dir: $USER_DATA_DIR"
printf 'Launch command:'
printf ' %q' "${CMD[@]}"
echo

if [[ "$DRY_RUN" -eq 1 ]]; then
  exit 0
fi

if [[ "$OPEN_BROWSER" -eq 1 ]]; then
  (
    sleep 1
    open "http://127.0.0.1:${PORT}/" >/dev/null 2>&1 || true
  ) &
fi

unset ELECTRON_RUN_AS_NODE
export ELECTRON_FORCE_IS_PACKAGED=true
export CODEX_CLI_PATH="$CLI_PATH"
export CUSTOM_CLI_PATH="$CLI_PATH"

exec "${CMD[@]}"
