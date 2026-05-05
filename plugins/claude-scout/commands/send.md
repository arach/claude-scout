---
description: Send a Scout tell, status update, FYI, or wake message without waiting for a reply
argument-hint: '[--to <agent> | --ref <ref> | --channel <name>] [--as <sender>] [--wake] [--message-file <path> | message]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/scout-companion.mjs" send "$ARGUMENTS"`

Present the command output as-is. Do not reinterpret message body mentions as routing if the user passed `--to`, `--ref`, or `--channel`.
