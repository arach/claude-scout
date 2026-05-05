---
description: Show recent Scout messages, flights, and broker activity
argument-hint: '[scout latest args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" latest "$ARGUMENTS"`

Present the command output as-is. Preserve ids and refs exactly.
