/// <reference types="node" />
import { EventEmitter } from "events";
import { MidiDevice, DeviceFilter, ExtendedType, MessageType, NoteMessage, ControlChangeMessage, MidiMessageEvent, MessageTypeName } from "./types";
export declare class Input extends EventEmitter {
    private midi;
    constructor(filter: DeviceFilter, virtual?: boolean);
    private handleMessage;
}
export declare const getMessageEvent: (messageType: MessageType | ExtendedType, bytes: number[]) => MidiMessageEvent;
export declare const getNameFromType: (messageType: MessageType) => MessageTypeName;
export declare const getNameFromExtendedType: (messageType: ExtendedType) => MessageTypeName;
export declare const getMessageType: (bytes: number[]) => MessageType | ExtendedType;
export declare const getNote: (bytes: number[]) => NoteMessage;
export declare const getControlChange: (bytes: number[]) => ControlChangeMessage;
export declare const getChannel: (bytes: number[]) => number;
export declare const findMatch: (midiInterface: any, name: string, exact?: boolean) => MidiDevice;
export declare const listPorts: (midiInterface: any) => MidiDevice[];
