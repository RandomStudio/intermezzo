/// <reference types="node" />
import { EventEmitter } from "events";
import { MidiDevice, DeviceFilter, ExtendedType, MessageType, NoteMessage } from "./types";
export declare class Input extends EventEmitter {
    private midi;
    constructor(filter: DeviceFilter, virtual?: boolean);
    private handleMessage;
}
export declare const getMessageType: (bytes: number[]) => MessageType | ExtendedType;
export declare const getNote: (bytes: number[]) => NoteMessage;
export declare const findMatch: (midiInterface: any, name: string, exact?: boolean) => MidiDevice;
export declare const listPorts: (midiInterface: any) => MidiDevice[];
