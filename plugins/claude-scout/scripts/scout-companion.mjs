#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const SIMPLE_COMMANDS = new Map([
  ["setup", ["setup"]],
  ["doctor", ["doctor"]],
  ["whoami", ["whoami"]],
  ["who", ["who"]],
  ["agents", ["who"]],
  ["latest", ["latest"]],
  ["send", ["send"]],
  ["ask", ["ask"]],
  ["broadcast", ["broadcast"]],
  ["up", ["up"]],
  ["ps", ["ps"]],
  ["open", ["server", "open"]],
]);

function printUsage() {
  console.log(
    [
      "Usage:",
      "  node scripts/scout-companion.mjs setup [scout setup args]",
      "  node scripts/scout-companion.mjs doctor [scout doctor args]",
      "  node scripts/scout-companion.mjs status",
      "  node scripts/scout-companion.mjs whoami [args]",
      "  node scripts/scout-companion.mjs who|agents [args]",
      "  node scripts/scout-companion.mjs latest [args]",
      "  node scripts/scout-companion.mjs send [scout send args]",
      "  node scripts/scout-companion.mjs ask [scout ask args]",
      "  node scripts/scout-companion.mjs broadcast [scout broadcast args]",
      "  node scripts/scout-companion.mjs up [scout up args]",
      "  node scripts/scout-companion.mjs ps [scout ps args]",
      "  node scripts/scout-companion.mjs open [scout server open args]",
      "",
      "Set OPENSCOUT_CLI_BIN to an explicit Scout executable if `scout` is not on PATH.",
    ].join("\n"),
  );
}

function splitRawArgumentString(raw) {
  const tokens = [];
  let current = "";
  let quote = null;
  let escaping = false;

  for (const char of raw) {
    if (escaping) {
      current += char;
      escaping = false;
      continue;
    }

    if (char === "\\") {
      escaping = true;
      continue;
    }

    if (quote) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (escaping) {
    current += "\\";
  }
  if (current) {
    tokens.push(current);
  }
  return tokens;
}

function normalizeArgv(argv) {
  if (argv.length !== 1) {
    return argv;
  }
  const [raw] = argv;
  if (!raw || !raw.trim()) {
    return [];
  }
  return splitRawArgumentString(raw);
}

function isExecutable(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function findOnPath(binary) {
  const pathValue = process.env.PATH ?? "";
  for (const entry of pathValue.split(path.delimiter)) {
    if (!entry) continue;
    const candidate = path.join(entry, binary);
    if (isExecutable(candidate)) {
      return candidate;
    }
  }
  return null;
}

function resolveScoutLauncher() {
  const explicit = process.env.OPENSCOUT_CLI_BIN || process.env.OPENSCOUT_CHANNEL_BIN;
  if (explicit) {
    return { command: explicit, prefix: [], label: explicit };
  }

  const scout = findOnPath(os.platform() === "win32" ? "scout.cmd" : "scout");
  if (scout) {
    return { command: scout, prefix: [], label: "scout" };
  }

  const bunx = findOnPath(os.platform() === "win32" ? "bunx.cmd" : "bunx");
  if (bunx) {
    return { command: bunx, prefix: ["@openscout/scout"], label: "bunx @openscout/scout" };
  }

  const bun = findOnPath(os.platform() === "win32" ? "bun.cmd" : "bun");
  if (bun) {
    return { command: bun, prefix: ["x", "@openscout/scout"], label: "bun x @openscout/scout" };
  }

  return null;
}

function printMissingScout() {
  console.error(
    [
      "Scout CLI was not found.",
      "",
      "Recommended setup:",
      "  bun add -g @openscout/scout",
      "  scout setup",
      "  scout up",
      "",
      "Fallback:",
      "  install Bun from https://bun.sh, or set OPENSCOUT_CLI_BIN to an explicit Scout executable.",
    ].join("\n"),
  );
}

function runScout(scoutArgs) {
  const launcher = resolveScoutLauncher();
  if (!launcher) {
    printMissingScout();
    return 127;
  }

  const result = spawnSync(launcher.command, [...launcher.prefix, ...scoutArgs], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`Failed to run ${launcher.label}: ${result.error.message}`);
    return 1;
  }

  return result.status ?? 0;
}

function printSection(title) {
  console.log("");
  console.log(`## ${title}`);
}

function runStatus() {
  let status = 0;

  const runSection = (title, args) => {
    printSection(title);
    const sectionStatus = runScout(args);
    if (status === 0 && sectionStatus !== 0) {
      status = sectionStatus;
    }
  };

  runSection("Scout Doctor", ["doctor"]);
  runSection("Current Sender", ["whoami"]);
  runSection("Agents", ["who"]);
  runSection("Latest Activity", ["latest"]);

  return status;
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const normalizedCommand = command?.trim();
  const args = normalizeArgv(rest);

  if (
    !normalizedCommand ||
    normalizedCommand === "help" ||
    normalizedCommand === "--help" ||
    normalizedCommand === "-h"
  ) {
    printUsage();
    return 0;
  }

  if (normalizedCommand === "status") {
    return runStatus();
  }

  const scoutCommand = SIMPLE_COMMANDS.get(normalizedCommand);
  if (!scoutCommand) {
    console.error(`Unknown scout companion command: ${normalizedCommand}`);
    printUsage();
    return 2;
  }

  return runScout([...scoutCommand, ...args]);
}

const exitCode = await main();
process.exit(exitCode);
