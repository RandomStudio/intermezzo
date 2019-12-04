/// <reference types="node" />
import { EventEmitter } from "events";
interface DeviceFilter {
    name?: string;
    port?: number;
}
export declare class Input extends EventEmitter {
    private midi;
    constructor(filter: DeviceFilter, virtual?: boolean);
    private handleMessage;
}
interface MidiDevice {
    name: string;
    port: number;
}
export declare const findMatch: (midiInterface: any, name: string, exact?: boolean) => MidiDevice;
export declare const listPorts: (midiInterface: any) => MidiDevice[];
export {};
