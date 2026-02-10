#!/usr/bin/env bash
set -euo pipefail

APP_PATH="/Applications/Codex.app"
ELECTRON_BIN_DEFAULT="/Users/igor/temp/untitled folder 67/codex_reverse/meta/electron-runner/node_modules/.bin/electron"
ELECTRON_BIN="${CODEX_ELECTRON_BIN:-$ELECTRON_BIN_DEFAULT}"

usage() {
  cat <<'USAGE'
Usage:
  launch_codex_debug_electron.sh [options] [-- <extra Codex args>]

Options:
  --app <path>        Codex.app path (default: /Applications/Codex.app)
  --electron <path>   Electron binary path
  -h, --help          Show help

Examples:
  ./launch_codex_debug_electron.sh
  ./launch_codex_debug_electron.sh -- --webui --port 4310
USAGE
}

EXTRA_ARGS=()
while (($#)); do
  case "$1" in
    --app)
      APP_PATH="${2:?missing value for --app}"
      shift 2
      ;;
    --electron)
      ELECTRON_BIN="${2:?missing value for --electron}"
      shift 2
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
if [[ ! -x "$ELECTRON_BIN" ]]; then
  if command -v electron >/dev/null 2>&1; then
    ELECTRON_BIN="$(command -v electron)"
  else
    echo "Error: electron binary not executable: $ELECTRON_BIN" >&2
    exit 1
  fi
fi

APP_ENTRY="$APP_PATH/Contents/Resources/app.asar"
CLI_PATH="$APP_PATH/Contents/Resources/codex"

if [[ ! -f "$APP_ENTRY" ]]; then
  echo "Error: missing app.asar: $APP_ENTRY" >&2
  exit 1
fi
if [[ ! -x "$CLI_PATH" ]]; then
  echo "Error: missing codex CLI binary: $CLI_PATH" >&2
  exit 1
fi

unset ELECTRON_RUN_AS_NODE
export ELECTRON_FORCE_IS_PACKAGED=true
export CODEX_CLI_PATH="$CLI_PATH"
export CUSTOM_CLI_PATH="$CLI_PATH"

CMD=("$ELECTRON_BIN" "$APP_ENTRY")
if ((${#EXTRA_ARGS[@]})); then
  CMD+=("${EXTRA_ARGS[@]}")
fi

echo "Launching Codex via external Electron"
echo "Electron: $ELECTRON_BIN"
echo "App: $APP_ENTRY"
printf 'Command:'
printf ' %q' "${CMD[@]}"
echo

exec "${CMD[@]}"
