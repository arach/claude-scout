---
description: Set up or refresh the local Scout installation used by Claude Code
argument-hint: '[scout setup args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" setup "$ARGUMENTS"`

Present the command output as-is. Preserve any follow-up commands exactly.
