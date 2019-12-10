"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midi_1 = __importDefault(require("midi"));
const events_1 = require("events");
const __1 = require("..");
class Input extends events_1.EventEmitter {
    constructor(filter, virtual = false) {
        super();
        this.close = () => {
            __1.logger.warn("closing MIDI input device");
            this.midi.close();
        };
        this.handleMessage = (deltaTime, bytes) => {
            __1.logger.debug("handleMessage:", deltaTime, bytes);
            const rawPayload = { deltaTime, bytes, deviceName: this.name };
            this.emit("rawMessage", rawPayload);
            const messageType = __1.getMessageType(bytes);
            const e = __1.getMessageEvent(messageType, bytes);
            this.emit(e.name, e.payload);
        };
        this.midi = new midi_1.default.input();
        const { name, port } = filter;
        if (virtual) {
            // TODO: create virtual input
        }
        else {
            if (name === undefined && port === undefined) {
                throw Error("you must define either a name or a portNumber for MIDI Input Device");
            }
            const match = __1.findMatch(this.midi, filter);
            if (match === undefined) {
                __1.logger.error("could not find MIDI device matching filter", {
                    name,
                    port
                });
                throw Error("could not find midi device");
            }
            this.name = match.name;
            __1.logger.info("found matching MIDI device:", match);
            this.midi.openPort(match.port);
            setTimeout(() => {
                this.emit("ready", match);
            });
            this.midi.on("message", this.handleMessage);
        }
    }
}
exports.Input = Input;
//# sourceMappingURL=index.js.map