/// <reference types="node" />
import { EventEmitter } from "events";
import { DeviceFilter, ValidPayloadTypes, MessageTypeName, MidiMessageEvent, MidiDevice } from "../types";
export declare class Output extends EventEmitter {
    private midi;
    private device;
    constructor(filter: DeviceFilter, virtual?: boolean);
    send: (name: MessageTypeName, payload: ValidPayloadTypes) => void;
    getName: () => string;
    getPort: () => number;
    getDevice: () => MidiDevice;
}
export declare const messageToBytes: (msg: MidiMessageEvent) => number[];
export declare const isNormalMessage: (name: MessageTypeName) => boolean;
export declare const channelBytes: (typeName: MessageTypeName, channel: number) => number;
export declare const isNoteMessage: (typeName: MessageTypeName) => boolean;
