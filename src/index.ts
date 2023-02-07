// External modules
import { getLogger } from "log4js";
import rc from "rc";
import parse from "parse-strings-in-object";

// Config
import defaults from "./config/defaults";
import { Config } from "./config/types";

const config: Config = parse(rc("prestissimo", defaults));

export const logger = getLogger("prestissimo");
logger.level = config.loglevel;
logger.debug("prestissimo library started with config", config);

// Internal modules
import { MidiDeviceDetails, DeviceDescription } from "./types";
import { MidiInput } from "./MidiInput";
import { MidiOutput } from "./MidiOutput";

export const findInput = (filter: DeviceDescription): MidiInput => {
  try {
    const midiInput = new MidiInput(filter, false);
    return midiInput;
  } catch (e) {
    logger.error(
      "Error finding (hardware) MIDI device with description",
      { filter },
      ":",
      e
    );
  }
};

export const createVirtualInput = (details: MidiDeviceDetails): MidiInput => {
  try {
    const midiInput = new MidiInput({ name: details.name }, true);
    return midiInput;
  } catch (e) {
    logger.error(
      "Error creating (virtual, software) MIDI device with details",
      { details },
      ":",
      e
    );
  }
};

export const findOutput = (filter: DeviceDescription): MidiOutput => {
  try {
    const midiOutput = new MidiOutput(filter, false);
    return midiOutput;
  } catch (e) {
    logger.error(
      "Error finding (hardware) MIDI device with description",
      { filter },
      ":",
      e
    );
  }
};

export const createVirtualOutput = (details: MidiDeviceDetails): MidiOutput => {
  try {
    const midiOutput = new MidiOutput({ name: details.name }, true);
    return midiOutput;
  } catch (e) {
    logger.error(
      "Error creating (virtual, software) MIDI device with details",
      { details },
      ":",
      e
    );
  }
};

export { setLoglevel } from "./utils";
