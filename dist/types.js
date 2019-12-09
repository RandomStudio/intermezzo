"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["noteOff"] = 8] = "noteOff";
    MessageType[MessageType["noteOn"] = 9] = "noteOn";
    MessageType[MessageType["polyAftertouch"] = 10] = "polyAftertouch";
    MessageType[MessageType["cc"] = 11] = "cc";
    MessageType[MessageType["program"] = 12] = "program";
    MessageType[MessageType["channelAftertouch"] = 13] = "channelAftertouch";
    MessageType[MessageType["pitch"] = 14] = "pitch";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageTypeName;
(function (MessageTypeName) {
    MessageTypeName["noteOff"] = "note off";
    MessageTypeName["noteOn"] = "note on";
    MessageTypeName["polyAftertouch"] = "poly aftertouch";
    MessageTypeName["cc"] = "control change";
    MessageTypeName["program"] = "program";
    MessageTypeName["channelAftertouch"] = "channel aftertouch";
    MessageTypeName["pitch"] = "pitch bend";
    MessageTypeName["sysex"] = "system exclusive";
    MessageTypeName["mtc"] = "MIDI time code";
    MessageTypeName["position"] = "song position pointer";
    MessageTypeName["select"] = "song select";
    MessageTypeName["sysexEnd"] = "terminate system exclusive dump";
    MessageTypeName["clock"] = "timing clock";
    MessageTypeName["start"] = "start current sequence";
    MessageTypeName["continue"] = "continue sequence";
    MessageTypeName["stop"] = "stop current sequence";
    MessageTypeName["reset"] = "reset all receivers";
})(MessageTypeName = exports.MessageTypeName || (exports.MessageTypeName = {}));
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
//# sourceMappingURL=types.js.map