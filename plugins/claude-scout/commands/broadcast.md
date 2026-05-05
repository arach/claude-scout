---
description: Broadcast an explicit Scout announcement to channel.shared
argument-hint: '[--as <sender>] [--message-file <path> | message]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" broadcast "$ARGUMENTS"`

Present the command output as-is. Use this command only for messages genuinely intended for everyone.
