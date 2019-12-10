/// <reference types="node" />
import { EventEmitter } from "events";
import { DeviceFilter, MidiDevice } from "../types";
export declare class Input extends EventEmitter {
    private midi;
    private device;
    constructor(filter: DeviceFilter, virtual?: boolean);
    close: () => void;
    getName: () => string;
    getPort: () => number;
    getDevice: () => MidiDevice;
    private handleMessage;
}
