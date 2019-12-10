"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const types_1 = require("./types");
describe("convert types properly from first byte of message", () => {
    test("control change messages", () => {
        const bytes = [177, 7, 72];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.controlChange);
        expect(types_1.MessageTypeName.controlChange).toBe("controlChange");
    });
    test("note on messages", () => {
        const bytes = [144, 45, 58];
        const messageType = index_1.getMessageType(bytes);
    });
    test("note on messages", () => {
        const bytes = [128, 45, 81];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOff);
        expect(types_1.MessageTypeName.noteOff).toBe("noteOff");
    });
    test("pitch bend messages", () => {
        const bytes = [224, 0, 0];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.pitch);
        expect(types_1.MessageTypeName.pitch).toBe("pitchBend");
    });
});
describe("names from message type enums", () => {
    test("names", () => {
        const messageType = types_1.MessageType.controlChange;
        expect(index_1.getNameFromType(messageType)).toBe("controlChange");
    });
});
describe("bytes to message payloads", () => {
    test("middle C noteOn", () => {
        const bytes = [144, 60, 105];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOn);
        expect(types_1.MessageTypeName.noteOn).toBe("noteOn");
        const n = index_1.getNote(bytes);
        expect(n.note).toBe(60); // middle C
        expect(n.velocity).toBe(105);
        expect(n.channel).toBeDefined();
        expect(n.channel).toBe(0);
    });
    test("middle C noteOff", () => {
        const bytes = [128, 60, 47];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOff);
        expect(types_1.MessageTypeName.noteOff).toBe("noteOff");
        const n = index_1.getNote(bytes);
        expect(n.note).toBe(60); // middle C
        expect(n.velocity).toBe(47);
        expect(n.channel).toBeDefined();
        expect(n.channel).toBe(0);
    });
    test("control change controller 7 channel 0", () => {
        const bytes = [176, 7, 96];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.controlChange);
        const c = index_1.getControlChange(bytes);
        expect(c.channel).toBe(0);
        expect(c.controller).toBe(7);
        expect(c.value).toBe(96);
    });
});
describe("message events", () => {
    test("note message", () => {
        const bytes = [128, 60, 47];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOff);
        expect(types_1.MessageTypeName.noteOff).toBe("noteOff");
        const e = index_1.getMessageEvent(messageType, bytes);
        expect(e.name).toBe("noteOff");
    });
    test("control change message", () => {
        const bytes = [177, 7, 83];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.controlChange);
        const e = index_1.getMessageEvent(messageType, bytes);
        expect(e.name).toBe("controlChange");
        // tslint:disable-next-line: no-string-literal
        expect(e.payload["controller"]).toBe(7);
        // tslint:disable-next-line: no-string-literal
        expect(e.payload["value"]).toBe(83);
        // tslint:disable-next-line: no-string-literal
        expect(e.payload["velocity"]).toBeUndefined();
    });
});
//# sourceMappingURL=index.test.js.map