"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midi_1 = __importDefault(require("midi"));
const log4js_1 = require("log4js");
const events_1 = require("events");
const types_1 = require("./types");
const logger = log4js_1.getLogger("node-midi-ts");
logger.level = "debug";
class Input extends events_1.EventEmitter {
    constructor(filter, virtual = false) {
        super();
        this.handleMessage = (deltaTime, bytes) => {
            logger.debug("handleMessage:", deltaTime, bytes);
            this.emit("rawMessage", { deltaTime, bytes });
        };
        this.midi = new midi_1.default.input();
        const { name, port } = filter;
        if (virtual) {
            // TODO: create virtual input
        }
        else {
            if (name === undefined && port === undefined) {
                throw Error("you must define either a name or a portNumber");
            }
            const match = name !== undefined
                ? exports.findMatch(this.midi, name)
                : exports.listPorts(this.midi)[port];
            if (match === undefined) {
                logger.error("could not find MIDI device matching filter", {
                    name,
                    port
                });
                throw Error("could not find midi device");
            }
            logger.info("found matching MIDI device:", match);
            this.midi.openPort(match.port);
            setTimeout(() => {
                this.emit("ready", match);
            });
            this.midi.on("message", this.handleMessage);
        }
    }
}
exports.Input = Input;
exports.getMessageType = (bytes) => {
    if (bytes[0] >= 0xf0) {
        const name = types_1.ExtendedType[bytes[0]];
        return types_1.ExtendedType[name];
    }
    else {
        const name = types_1.MessageType[bytes[0] >> 4];
        return types_1.MessageType[name];
    }
};
exports.findMatch = (midiInterface, name, exact = false) => {
    const ports = exports.listPorts(midiInterface);
    return exact
        ? ports.find(i => i.name === name)
        : ports.find(i => i.name.includes(name));
};
exports.listPorts = (midiInterface) => {
    const numInputs = midiInterface.getPortCount();
    const portNumbers = Array(numInputs)
        .fill(0)
        .map((i, index) => index);
    return portNumbers.map(i => {
        const name = midiInterface.getPortName(i);
        logger.debug(`device #${i} = ${name}`);
        return {
            port: i,
            name
        };
    });
};
//# sourceMappingURL=index.js.map