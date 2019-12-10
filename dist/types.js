"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["noteOff"] = 8] = "noteOff";
    MessageType[MessageType["noteOn"] = 9] = "noteOn";
    MessageType[MessageType["polyAftertouch"] = 10] = "polyAftertouch";
    MessageType[MessageType["controlChange"] = 11] = "controlChange";
    MessageType[MessageType["program"] = 12] = "program";
    MessageType[MessageType["channelAftertouch"] = 13] = "channelAftertouch";
    MessageType[MessageType["pitch"] = 14] = "pitch";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ExtendedType;
(function (ExtendedType) {
    ExtendedType[ExtendedType["sysex"] = 240] = "sysex";
    ExtendedType[ExtendedType["mtc"] = 241] = "mtc";
    ExtendedType[ExtendedType["position"] = 242] = "position";
    ExtendedType[ExtendedType["select"] = 243] = "select";
    ExtendedType[ExtendedType["tune"] = 246] = "tune";
    ExtendedType[ExtendedType["sysexEnd"] = 247] = "sysexEnd";
    ExtendedType[ExtendedType["clock"] = 248] = "clock";
    ExtendedType[ExtendedType["start"] = 250] = "start";
    ExtendedType[ExtendedType["continue"] = 251] = "continue";
    ExtendedType[ExtendedType["stop"] = 252] = "stop";
    ExtendedType[ExtendedType["reset"] = 255] = "reset";
})(ExtendedType = exports.ExtendedType || (exports.ExtendedType = {}));
// https://users.cs.cf.ac.uk/Dave.Marshall/Multimedia/node158.html
var MessageTypeName;
(function (MessageTypeName) {
    MessageTypeName["noteOff"] = "noteOff";
    MessageTypeName["noteOn"] = "noteOn";
    MessageTypeName["polyAftertouch"] = "polyphonicKeyPressure";
    MessageTypeName["controlChange"] = "controlChange";
    MessageTypeName["program"] = "programChange";
    MessageTypeName["channelAftertouch"] = "channelPressure";
    MessageTypeName["pitch"] = "pitchBend";
    MessageTypeName["sysex"] = "systemExclusive";
    MessageTypeName["mtc"] = "timeCode";
    MessageTypeName["position"] = "songPositionPointer";
    MessageTypeName["select"] = "songSelect";
    MessageTypeName["sysexEnd"] = "terminateSystemExclusiveDump";
    MessageTypeName["clock"] = "timingClock";
    MessageTypeName["start"] = "startCurrentSequence";
    MessageTypeName["continue"] = "continueSequence";
    MessageTypeName["stop"] = "stopCurrentSequence";
    MessageTypeName["reset"] = "resetAllReceivers";
})(MessageTypeName = exports.MessageTypeName || (exports.MessageTypeName = {}));
//# sourceMappingURL=types.js.map