#!/usr/bin/env node
const { listPorts } = require("../dist");
const midi = require("midi");
const { getLogger } = require("log4js");

const logger = getLogger("prestissimo-utils");
logger.level = "debug";

const input = new midi.Input();

const inputDevices = listPorts(input);
logger.info(
  `found ${inputDevices.length} INPUT devices: \n`,
  JSON.stringify(inputDevices, null, 4)
);

const output = new midi.Output();

const outputDevices = listPorts(output);
logger.info(
  `found ${outputDevices.length} OUTPUT devices: \n`,
  JSON.stringify(outputDevices, null, 4)
);
