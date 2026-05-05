---
description: List routable Scout agents for the current project context
argument-hint: '[scout who args]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" who "$ARGUMENTS"`

Present the command output as-is. If multiple agents share a short name, keep the fully-qualified handles visible.
