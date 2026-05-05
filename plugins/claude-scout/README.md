# Claude Scout

Claude Scout packages OpenScout's Claude Code integration as an installable Claude plugin.

The repository and plugin directory are named `claude-scout`. The Claude-facing
plugin name is `scout`, which gives operators the shorter command namespace:
`/scout:*`.

It provides two surfaces:

- slash commands for precise operator actions such as `/scout:ask`,
  `/scout:send`, `/scout:up`, and `/scout:status`
- a Claude Code channel for ambient broker-routed push, mentions, group updates,
  and replies

The channel launches `scout channel`, which:

- subscribes to the local Scout broker event stream
- pushes incoming Scout messages into the running Claude Code session with `notifications/claude/channel`
- exposes `scout_reply` for replies to incoming Scout messages
- exposes `scout_send` for new Scout messages from the Claude session

## Commands

The plugin currently exposes:

<!-- scout-commands:start -->
- `/scout:setup` - run `scout setup`
- `/scout:doctor` - check broker, service, and support paths
- `/scout:status` - show doctor, sender, agents, and recent activity
- `/scout:whoami` - show the current Scout sender
- `/scout:who` - list routable agents
- `/scout:agents` - list available agents and their routable handles
- `/scout:latest` - show recent broker activity
- `/scout:send` - send a tell, FYI, status update, or wake message
- `/scout:ask` - ask an agent for owned work or a concrete answer
- `/scout:broadcast` - broadcast to `channel.shared`
- `/scout:up` - start or revive a Scout agent
- `/scout:ps` - show Scout-launched agent process/session state
- `/scout:open` - open the Scout web UI
<!-- scout-commands:end -->

The commands are thin wrappers around the Scout CLI. They preserve Scout's
structured routing model: use `--to` for DMs, `--channel` for group threads,
`--ref` for concrete session continuity, and `broadcast` only for shared FYIs.
The command markdown and the list above are generated from
`commands.scout.json`; update that file and run
`node scripts/generate-commands.mjs --write`.

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
/plugin marketplace add arach/claude-scout
/plugin install scout@openscout
```

During the Claude Code Channels research preview, launch Claude Code with the development-channel flag unless the plugin is on an approved allowlist:

```bash
claude --dangerously-load-development-channels plugin:scout@openscout
```

For local path testing from this repository:

```text
/plugin marketplace add /absolute/path/to/claude-scout
/plugin install scout@openscout
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

- `OPENSCOUT_CLI_BIN`: absolute path to a Scout executable for slash commands
- `OPENSCOUT_CHANNEL_BIN`: absolute path to a Scout executable
- `OPENSCOUT_SETUP_CWD`: default Scout context root for agent identity resolution
- `OPENSCOUT_BROKER_URL`: explicit broker URL when the default broker URL is not correct

For the channel process, if `OPENSCOUT_SETUP_CWD` is unset, the wrapper
defaults it to `$HOME` so the plugin does not accidentally use the plugin
directory as its Scout context. Slash commands keep Claude Code's current
working directory so Scout can infer the active project sender.

## Current Limits

- Permission relay is not enabled yet.
- Replies currently route through the existing `scout_reply` tool and do not yet preserve every reply-thread field as a first-class Scout reply route.
- Events only arrive while the Claude Code session and channel plugin are running.

## Official Marketplace Submission

Claude's plugin docs say official marketplace submissions go through the in-app submission forms:

- Claude.ai: `claude.ai/settings/plugins/submit`
- Console: `platform.claude.com/plugins/submit`

Channel plugins also require channel review/allowlisting during the research preview.
