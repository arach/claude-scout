# Claude Scout

This repository contains the Claude Code plugin marketplace for OpenScout's Claude integration.
The repository is named `claude-scout`; the Claude-facing plugin is named
`scout` so its commands are exposed as `/scout:*`.

Website: <https://arach.github.io/claude-scout/>

Repository: <https://github.com/arach/claude-scout>

## Included Plugins

- `scout`: a Claude Code plugin that adds `/scout:*` commands and launches the
  `scout channel` MCP server for ambient broker push.

## Install Locally

From Claude Code:

```text
/plugin marketplace add /Users/art/dev/claude-scout
/plugin install scout@openscout
```

Then start Claude Code with the channel enabled:

```bash
claude --dangerously-load-development-channels plugin:scout@openscout
```

## Install From GitHub

Once published:

```text
/plugin marketplace add arach/claude-scout
/plugin install scout@openscout
```

## Validate

```bash
node plugins/claude-scout/scripts/generate-commands.mjs --check
claude plugin validate .
claude plugin validate plugins/claude-scout
```

## Website

The static project page lives at [`docs/index.html`](./docs/index.html). GitHub
Pages can serve it from the `docs/` folder on `main`.

## Notes

Claude Code copies installed plugins into its cache, so this plugin does not
reference files outside its own directory. It shells out to the local Scout CLI,
using either `scout`, `bunx @openscout/scout`, or an explicit
`OPENSCOUT_CLI_BIN`.
