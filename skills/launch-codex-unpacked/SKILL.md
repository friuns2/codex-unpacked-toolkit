---
name: launch-codex-unpacked
description: Launch unpacked Codex Desktop builds with debug ports and optional SSH host autostart using launch_codex_unpacked.sh. Use when asked to run Codex from extracted app.asar, enable inspect/remote-debugging, select an SSH host on startup, or keep temporary unpacked artifacts for investigation.
---

# Launch Codex Unpacked

Use this skill when the task is to run Codex Desktop from unpacked `app.asar` with controlled debug settings.

## Primary Script

- `./launch_codex_unpacked.sh`

## Preflight

Run these checks before launch:

```bash
test -x ./launch_codex_unpacked.sh
test -d /Applications/Codex.app
command -v npx >/dev/null
```

If a custom app path is provided, verify it contains:

- `<APP_PATH>/Contents/Resources/app.asar`
- `<APP_PATH>/Contents/Resources/codex`

## Common Launch Recipes

Default launch (inspect + remote debugging enabled):

```bash
./launch_codex_unpacked.sh
```

Custom ports:

```bash
./launch_codex_unpacked.sh --inspect-port 9330 --remote-debug-port 9333
```

Disable one or both debug channels:

```bash
./launch_codex_unpacked.sh --no-inspect
./launch_codex_unpacked.sh --no-remote-debug
```

Launch against a different Codex.app:

```bash
./launch_codex_unpacked.sh --app "/Applications/Codex.app"
```

Preserve extracted temp app for analysis:

```bash
./launch_codex_unpacked.sh --keep-temp
```

Use a fixed Chromium profile/user data directory:

```bash
./launch_codex_unpacked.sh --user-data-dir "/tmp/codex-user-data"
```

SSH host autostart mode:

```bash
./launch_codex_unpacked.sh --ssh-host "user@host"
```

What SSH mode does:

- Performs non-interactive SSH preflight (`BatchMode` + timeout).
- Updates `~/.codex/.codex-global-state.json` (`electron-ssh-hosts`).
- Patches unpacked main bundle so startup opens the first saved SSH host.

## Argument Pass-through

Append app arguments after `--`:

```bash
./launch_codex_unpacked.sh -- --some-codex-flag value
```

## Output You Should Report

After launch, report:

- `App dir` path
- `User data dir` path
- final `Command` line
- whether `SSH host` mode was enabled

## Troubleshooting

- `Missing app.asar` or `Missing codex binary`: wrong `--app` path.
- `npx is required`: install Node.js/npm tooling.
- `SSH autostart patch anchor not found`: Codex bundle changed; script patch target must be updated.
- SSH preflight warning: app can still launch, but remote host connection may fail in UI.
