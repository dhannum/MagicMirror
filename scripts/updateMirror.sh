#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "!!!! FAILED (line $LINENO): $BASH_COMMAND" >&2' ERR

# Always run from the repo root, no matter where the script is called from
cd "$(dirname "$(readlink -f "$0")")/.."

log() { printf '\n**** %s\n' "$*"; }

# Use npm ci when a lockfile exists, otherwise npm install. Skip dev deps either way.
npm_install() {
  local flags=(--omit=dev --no-audit --no-fund)
  if [[ -f package-lock.json ]]; then
    echo "(lockfile found: npm ci)"
    npm ci "${flags[@]}"
  else
    echo "(no lockfile: npm install)"
    npm install "${flags[@]}"
  fi
}

log "Merging from upstream"
git pull --autostash --no-edit upstream master

log "Merging from origin"
git pull --autostash --no-edit origin master

log "Top-level npm"
npm_install

shopt -s nullglob
for dir in modules/*/; do
  dir=${dir%/}
  if [[ ! -e "$dir/.git" ]]; then
    log "Skipping $dir (not a git repo)"
    continue
  fi
  log "Pull/Install $dir"
  (
    cd "$dir"
    git pull --autostash --no-edit
    if [[ -f package.json ]]; then
      npm_install
    else
      echo "(no package.json, skipping npm)"
    fi
  )
done

log "Done"
