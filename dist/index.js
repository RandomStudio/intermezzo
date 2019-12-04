"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midi_1 = __importDefault(require("midi"));
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger();
logger.level = "debug";
class Input {
    constructor(name, portNumber, virtual = false) {
        this.midi = new midi_1.default.input();
        logger.debug("node-midi", typeof this.midi, this.midi);
        if (virtual) {
            // TODO: create virtual input
        }
        else {
            if (name === undefined && portNumber === undefined) {
                throw Error("you must define either a name or a portNumber");
            }
            const match = name !== undefined
                ? exports.findMatch(this.midi, name)
                : exports.listPorts(this.midi)[portNumber];
            if (match === undefined) {
                logger.error("could not find MIDI device matching filter", {
                    name,
                    portNumber
                });
                throw Error("could not find midi device");
            }
            logger.info("found matching MIDI device:", match);
        }
    }
}
exports.Input = Input;
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