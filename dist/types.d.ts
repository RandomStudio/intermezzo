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
export declare enum MessageType {
    noteOff = 8,
    noteOn = 9,
    polyAftertouch = 10,
    cc = 11,
    program = 12,
    channelAftertouch = 13,
    pitch = 14
}
export declare enum MessageTypeName {
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
export declare enum ExtendedType {
    sysex = 240,
    mtc = 241,
    position = 242,
    select = 243,
    tune = 246,
    sysexEnd = 247,
    clock = 248,
    start = 250,
    continue = 251,
    stop = 252,
    reset = 255
}
export interface MidiMessage {
    type: MessageType | ExtendedType;
}
