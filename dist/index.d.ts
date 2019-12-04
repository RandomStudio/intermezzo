export declare class Input {
    private midi;
    constructor(name?: string, portNumber?: number, virtual?: boolean);
}
interface MidiDevice {
    name: string;
    port: number;
}
export declare const findMatch: (midiInterface: any, name: string, exact?: boolean) => MidiDevice;
export declare const listPorts: (midiInterface: any) => MidiDevice[];
export {};
