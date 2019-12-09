export interface MidiDevice {
  name: string;
  port: number;
}

export interface DeviceFilter {
  name?: string;
  port?: number;
}

export enum MessageType {
  noteOff = 0x08,
  noteOn = 0x09,
  polyAftertouch = 0x0a,
  cc = 0x0b,
  program = 0x0c,
  channelAftertouch = 0x0d,
  pitch = 0x0e
}

export enum MessageTypeName {
  noteOff = "note off",
  noteOn = "note on",
  polyAftertouch = "poly aftertouch",
  cc = "control change",
  program = "program",
  channelAftertouch = "channel aftertouch",
  pitch = "pitch bend",
  sysex = "system exclusive",
  mtc = "MIDI time code",
  position = "song position pointer",
  select = "song select",
  sysexEnd = "terminate system exclusive dump",
  clock = "timing clock",
  start = "start current sequence",
  continue = "continue sequence",
  stop = "stop current sequence",
  reset = "reset all receivers"
}

export enum ExtendedType {
  sysex = 0xf0,
  mtc = 0xf1,
  position = 0xf2,
  select = 0xf3,
  tune = 0xf6,
  sysexEnd = 0xf7,
  clock = 0xf8,
  start = 0xfa,
  continue = 0xfb,
  stop = 0xfc,
  reset = 0xff
}

export interface MidiMessage {
  type: MessageType | ExtendedType;
}
