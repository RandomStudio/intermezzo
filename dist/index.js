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
            const rawPayload = { deltaTime, bytes };
            this.emit("rawMessage", rawPayload);
            const messageType = exports.getMessageType(bytes);
            const e = exports.getMessageEvent(messageType, bytes);
            this.emit(e.name, e.payload);
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
exports.getMessageEvent = (messageType, bytes) => {
    switch (messageType) {
        case types_1.MessageType.noteOn:
        case types_1.MessageType.noteOff:
            const note = exports.getNote(bytes);
            return {
                name: exports.getNameFromType(messageType),
                payload: note
            };
        default:
            logger.warn("unknown message type");
            return null;
    }
};
exports.getNameFromType = (messageType) => types_1.MessageTypeName[types_1.MessageType[messageType]];
exports.getNameFromExtendedType = (messageType) => types_1.MessageTypeName[types_1.ExtendedType[messageType]];
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
exports.getNote = (bytes) => ({
    channel: exports.getChannel(bytes),
    note: bytes[1],
    velocity: bytes[2]
});
exports.getControlChange = (bytes) => ({
    channel: exports.getChannel(bytes),
    controller: bytes[1],
    value: bytes[2]
});
exports.getChannel = (bytes) => bytes[0] & 0xf;
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