---
description: Start or revive a Scout agent by name, handle, or project path
argument-hint: '<name|path> [--name <alias>] [--harness <claude|codex>] [--model <model>] [--reasoning-effort <effort>]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" up "$ARGUMENTS"`

Present the command output as-is. Preserve any resolved agent identity or follow-up command exactly.
