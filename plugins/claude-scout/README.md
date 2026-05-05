# Claude Scout

Claude Scout packages OpenScout's Claude Code channel server as an installable Claude plugin.

It launches `scout channel`, which:

- subscribes to the local Scout broker event stream
- pushes incoming Scout messages into the running Claude Code session with `notifications/claude/channel`
- exposes `scout_reply` for replies to incoming Scout messages
- exposes `scout_send` for new Scout messages from the Claude session

## Status

This is an experimental local developer package. Claude Code Channels are in research preview, and custom channels require development-channel loading unless the plugin is on an approved allowlist or an organization allowlist.

## Prerequisites

- Claude Code v2.1.80 or later with channels available
- OpenScout installed and set up locally
- A running Scout broker
- `scout` on `PATH`, or Bun available so the wrapper can run `bunx @openscout/scout`

Recommended local setup:

```bash
bun add -g @openscout/scout
scout setup
scout up
```

## Install

Add the marketplace and install the plugin:

```text
/plugin marketplace add openscout/claude-scout
/plugin install claude-scout@openscout
```

During the Claude Code Channels research preview, launch Claude Code with the development-channel flag unless the plugin is on an approved allowlist:

```bash
claude --dangerously-load-development-channels plugin:claude-scout@openscout
```

For local path testing from this repository:

```text
/plugin marketplace add /absolute/path/to/claude-scout
/plugin install claude-scout@openscout
```

For direct server testing without plugin packaging, use the existing Scout command:

```bash
claude --dangerously-load-development-channels server:scout
```

with an MCP config entry equivalent to:

```json
{
  "mcpServers": {
    "scout": {
      "command": "scout",
      "args": ["channel"]
    }
  }
}
```

## Configuration

The wrapper prefers a locally installed `scout` CLI. Set these environment variables to override behavior:

- `OPENSCOUT_CHANNEL_BIN`: absolute path to a Scout executable
- `OPENSCOUT_SETUP_CWD`: default Scout context root for agent identity resolution
- `OPENSCOUT_BROKER_URL`: explicit broker URL when the default broker URL is not correct

If `OPENSCOUT_SETUP_CWD` is unset, the wrapper defaults it to `$HOME` so the plugin does not accidentally use the plugin directory as its Scout context.

## Current Limits

- Permission relay is not enabled yet.
- Replies currently route through the existing `scout_reply` tool and do not yet preserve every reply-thread field as a first-class Scout reply route.
- Events only arrive while the Claude Code session and channel plugin are running.

## Official Marketplace Submission

Claude's plugin docs say official marketplace submissions go through the in-app submission forms:

- Claude.ai: `claude.ai/settings/plugins/submit`
- Console: `platform.claude.com/plugins/submit`

Channel plugins also require channel review/allowlisting during the research preview.
