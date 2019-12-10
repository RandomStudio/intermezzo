/// <reference types="node" />
import { EventEmitter } from "events";
import { DeviceFilter } from "../types";
export declare class Input extends EventEmitter {
    private midi;
    private name;
    constructor(filter: DeviceFilter, virtual?: boolean);
    close: () => void;
    private handleMessage;
}
