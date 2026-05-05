---
description: Show which Scout identity this Claude Code session will speak as
argument-hint: '[scout whoami args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" whoami "$ARGUMENTS"`

Present the command output as-is.
