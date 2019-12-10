/// <reference types="node" />
import { EventEmitter } from "events";
import { DeviceFilter } from "../types";
export declare class Input extends EventEmitter {
    private midi;
    constructor(filter: DeviceFilter, virtual?: boolean);
    private handleMessage;
}
