import { EventEmitter } from "events";
import { MidiDeviceDetails } from "./types";
import midi from "midi";
import { logger } from ".";

export class BaseMidiDevice extends EventEmitter {
  protected midi: typeof midi.Input;
  protected device: MidiDeviceDetails;

  constructor() {
    super();
  }

  public getName = () => this.device.name;
  public getPort = () => this.device.port;
  public getDevice = () => this.device;

  public close = () => {
    logger.info("closing MIDI device", this.device);
    this.midi.closePort();
  };

  protected emitReady = () => {
    logger.info("opened MIDI device", this.device);
    setTimeout(() => {
      this.emit("ready", this.device);
    });
  };
}
