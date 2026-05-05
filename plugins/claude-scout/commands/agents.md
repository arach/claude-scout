---
description: List available Scout agents and their routable handles
argument-hint: '[scout who args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" agents "$ARGUMENTS"`

Present the command output as-is. Prefer fully-qualified handles when the output shows ambiguity.
