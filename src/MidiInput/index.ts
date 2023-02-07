import midi from "midi";
import {
  RawMessage,
  MidiMessageEvent,
  DeviceDescription,
  NoteMessage,
  ControlChangeMessage,
  MidiDeviceDetails,
} from "../types";
import { BaseMidiDevice } from "../BaseDevice";
import { logger } from "..";
import { findMatch, getMessageEvent, getMessageType } from "../utils";

export declare interface MidiInput {
  on(event: "ready", listener: (payload: MidiDeviceDetails) => void): this;
  on(
    event: "noteOn" | "noteOff",
    listener: (payload: NoteMessage) => void
  ): this;
  on(
    event: "controlChange",
    listener: (payload: ControlChangeMessage) => void
  ): this;
  on(
    event: "rawMessage",
    listener: (payload: RawMessage) => void
  ): this;
}
}

export class MidiInput extends BaseMidiDevice {
  constructor(description: DeviceDescription, virtual = false) {
    super();
    this.midi = new midi.input();
    const { name, port } = description;
    if (virtual) {
      if (name === undefined) {
        throw Error("you must define a name for a virtual MIDI Input Device");
      }
      this.midi.openVirtualPort(name);
      this.deviceDetails = { name, port };
      this.emitReady();
    } else {
      if (name === undefined && port === undefined) {
        throw Error(
          "you must define either a name or a portNumber for MIDI Input Device, if not a virtual device"
        );
      }

      logger.debug("Find match based on", description, "...");
      const match = findMatch(this.midi, description);

      if (match === undefined) {
        logger.error("could not find MIDI device matching filter", {
          name,
          port,
        });
        throw Error("could not find midi device");
      }

      logger.debug("Match on", match);
      this.deviceDetails = match;

      logger.info("found matching MIDI device:", match);

      this.midi.openPort(match.port);

      this.emitReady();
    } // if not virtual

    this.midi.on("message", this.handleMessage);
  }

  protected handleMessage = (deltaTime: number, bytes: number[]) => {
    logger.debug("handleMessage:", deltaTime, bytes);
    const rawPayload: RawMessage = {
      deltaTime,
      bytes,
      deviceName: this.deviceDetails.name,
    };
    this.emit("rawMessage", rawPayload);

    const messageType = getMessageType(bytes);

    const e: MidiMessageEvent = getMessageEvent(messageType, bytes);

    this.emit(e.name, e.payload);
  };
}
