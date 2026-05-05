---
description: Open the Scout web UI for the current local broker
argument-hint: '[scout server open args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" open "$ARGUMENTS"`

Present the command output as-is. Preserve the opened URL when Scout prints one.
