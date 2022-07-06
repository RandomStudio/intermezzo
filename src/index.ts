// External modules
import midi from "midi";
import { getLogger } from "log4js";
import rc from "rc";
import parse from "parse-strings-in-object";

// Config
import defaults from "./config/defaults";
import { Config } from "./config/types";

const config: Config = parse(rc("prestissimo", defaults));

export const logger = getLogger("prestissimo");
logger.level = config.loglevel;

// Internal modules
import {
  MidiDeviceDetails,
  ExtendedType,
  MessageType,
  NoteMessage,
  ControlChangeMessage,
  MidiMessageEvent,
  MessageTypeName,
  DeviceDescription,
} from "./types";
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

export const createOutput = (details: MidiDeviceDetails) => {
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
