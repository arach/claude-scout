---
description: Run Scout operational checks for the local broker, service, and support paths
argument-hint: '[scout doctor args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" doctor "$ARGUMENTS"`

Present the command output as-is. Preserve any error details and follow-up commands exactly.
