import midi from "midi";
import { getLogger } from "log4js";
import { EventEmitter } from "events";

const logger = getLogger();
logger.level = "debug";

interface DeviceFilter {
  name?: string;
  port?: number;
}

export class Input extends EventEmitter {
  private midi: typeof midi.Input;

  constructor(filter: DeviceFilter, virtual = false) {
    super();
    this.midi = new midi.input();
    const { name, port } = filter;
    if (virtual) {
      // TODO: create virtual input
    } else {
      if (name === undefined && port === undefined) {
        throw Error("you must define either a name or a portNumber");
      }

      const match =
        name !== undefined
          ? findMatch(this.midi, name)
          : listPorts(this.midi)[port];

      if (match === undefined) {
        logger.error("could not find MIDI device matching filter", {
          name,
          port
        });
        throw Error("could not find midi device");
      }

      logger.info("found matching MIDI device:", match);

      this.midi.openPort(match.port);
      setTimeout(() => {
        this.emit("ready", match);
      });

      this.midi.on("message", this.handleMessage);
    }
  }

  private handleMessage = (deltaTime: number, bytes: any) => {
    logger.debug("handleMessage:", deltaTime, bytes);
    this.emit("rawMessage", { deltaTime, bytes });
  };
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
