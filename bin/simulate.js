#!/usr/bin/env node
const { createVirtualOutput, findOutput } = require("../dist");
const { MessageTypeName } = require("../dist/types");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).options({
  deviceName: {
    type: "string",
    default: "VirtualMIDI",
    describe: "Full or partial name of MIDI device to use/create",
  },
  channel: {
    type: "number",
    default: 0,
    describe: "MIDI Channel, zero-based index",
  },
  controller: {
    type: "number",
    default: 0,
    describe: "CC Controller number, zero-based index",
  },
  value: {
    type: "number",
    describe:
      "Specific value to use [0-127]; if not provided we just use random values",
  },
  interval: {
    type: "number",
    default: 1000,
    describe: "Interval between repeated sends, in milliseconds",
  },
}).argv;

console.log("args parsed:", argv);

// // const output = createVirtualOutput({ name: "Test" });
let output;
try {
  output = findOutput({ name: argv.deviceName });
} catch (e) {
  console.log(
    `Could not find output by name "${argv.deviceName}". Will try to create instead...`
  );
  output = createVirtualOutput({ name: argv.deviceName });
}

output.on("ready", (details) => {
  console.log("ready", details);

  setInterval(() => {
    output.send(MessageTypeName.controlChange, {
      channel: argv.channel,
      controller: argv.controller,
      value: argv.value || Math.round(Math.random() * 127),
    });
  }, argv.interval);
});
