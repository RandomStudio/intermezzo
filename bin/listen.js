#!/usr/bin/env node
const midi = require("midi");
const { listPorts, shortDescription, setLoglevel } = require("../dist/utils");
const { getLogger } = require("log4js");
const { findInput } = require("../dist");

const logger = getLogger("prestissimo-utils");
logger.level = "debug";
setLoglevel("debug");

const interface = new midi.Input();

const deviceDetails = listPorts(interface);
logger.info(
  `found ${deviceDetails.length} INPUT devices: \n`,
  JSON.stringify(deviceDetails, null, 4)
);

const midiInputs = deviceDetails.map((d) => findInput(d));

logger.debug(
  "created",
  midiInputs.length,
  "MIDI inputs for",
  deviceDetails.length,
  "input devices found"
);

midiInputs.forEach((input) => {
  const description = input.getDeviceDetails();
  logger.debug("Add handlers for", { description });

  input.on("ready", (deviceDetails) => {
    console.log(shortDescription(description), `"ready":`, deviceDetails);
  });

  input.on("rawMessage", (e) => {
    console.log(shortDescription(description), `"rawMessage":`, e);
  });

  input.on("noteOn", (e) => {
    const { channel, note, velocity } = e;
    console.log(shortDescription(description), `"noteOn":`, {
      channel,
      note,
      velocity,
    });
  });

  input.on("controlChange", (e) => {
    console.log(shortDescription(description), `"controlChange":`, e);
  });

  input.on("noteOff", (e) => {
    console.log(shortDescription(description), `"noteOff:"`, e);
  });
});
