# Claude Scout

This repository contains the Claude Code plugin marketplace for OpenScout's Claude integration.

## Included Plugins

- `claude-scout`: a Claude Code channel plugin that launches `scout channel`.

## Install Locally

From Claude Code:

```text
/plugin marketplace add /Users/art/dev/claude-scout
/plugin install claude-scout@openscout
```

Then start Claude Code with the channel enabled:

```bash
claude --dangerously-load-development-channels plugin:claude-scout@openscout
```

## Install From GitHub

Once published:

```text
/plugin marketplace add openscout/claude-scout
/plugin install claude-scout@openscout
```

## Validate

```bash
claude plugin validate .
claude plugin validate plugins/claude-scout
```

## Notes

Claude Code copies installed plugins into its cache, so this plugin does not reference files outside its own directory. It shells out to `scout channel`, using either a local `scout` executable or `bunx @openscout/scout`.
