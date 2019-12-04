import midi from "midi";
import { getLogger, Logger } from "log4js";

const logger = getLogger();
logger.level = "debug";

export class Input {
  private midi: typeof midi.Input;

  constructor(name?: string, portNumber?: number, virtual = false) {
    this.midi = new midi.input();
    logger.debug("node-midi", typeof this.midi, this.midi);
    if (virtual) {
      // TODO: create virtual input
    } else {
      if (name === undefined && portNumber === undefined) {
        throw Error("you must define either a name or a portNumber");
      }

      const match =
        name !== undefined
          ? findMatch(this.midi, name)
          : listPorts(this.midi)[portNumber];

      if (match === undefined) {
        logger.error("could not find MIDI device matching filter", {
          name,
          portNumber
        });
        throw Error("could not find midi device");
      }

      logger.info("found matching MIDI device:", match);
    }
  }
}

interface MidiDevice {
  name: string;
  port: number;
}

export const findMatch = (
  midiInterface: typeof midi.Input | typeof midi.Output,
  name: string,
  exact = false
): MidiDevice => {
  const ports = listPorts(midiInterface);
  return exact
    ? ports.find(i => i.name === name)
    : ports.find(i => i.name.includes(name));
};

export const listPorts = (
  midiInterface: typeof midi.Input | typeof midi.Output
): MidiDevice[] => {
  const numInputs = midiInterface.getPortCount();

  const portNumbers = Array(numInputs)
    .fill(0)
    .map((i, index) => index);

  return portNumbers.map(i => {
    const name = midiInterface.getPortName(i);
    logger.debug(`device #${i} = ${name}`);
    return {
      port: i,
      name
    };
  });
};
