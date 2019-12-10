export interface MidiDevice {
  name: string;
  port: number;
}

export interface DeviceFilter {
  name?: string;
  port?: number;
}

export interface RawMessage {
  deltaTime: number;
  bytes: number[];
}

export interface NoteMessage {
  note: number;
  velocity: number;
  channel: number;
}

export interface ControlChangeMessage {
  controller: number;
  channel: number;
  value: number;
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

// https://users.cs.cf.ac.uk/Dave.Marshall/Multimedia/node158.html
export enum MessageTypeName {
  noteOff = "note off",
  noteOn = "note on",
  polyAftertouch = "polyphonic key pressure",
  cc = "control change",
  program = "program change",
  channelAftertouch = "channel pressure",
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
