"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const types_1 = require("./types");
describe("convert types properly from first byte of message", () => {
    test("control change messages", () => {
        const bytes = [177, 7, 72];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.cc);
        expect(types_1.MessageTypeName.cc).toBe("control change");
    });
    test("note on messages", () => {
        const bytes = [144, 45, 58];
        const messageType = index_1.getMessageType(bytes);
    });
    test("note on messages", () => {
        const bytes = [128, 45, 81];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOff);
        expect(types_1.MessageTypeName.noteOff).toBe("note off");
    });
    test("pitch bend messages", () => {
        const bytes = [224, 0, 0];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.pitch);
        expect(types_1.MessageTypeName.pitch).toBe("pitch bend");
    });
});
describe("bytes to message payloads", () => {
    test("middle C noteOn", () => {
        const bytes = [144, 60, 105];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOn);
        expect(types_1.MessageTypeName.noteOn).toBe("note on");
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
        expect(types_1.MessageTypeName.noteOff).toBe("note off");
        const n = index_1.getNote(bytes);
        expect(n.note).toBe(60); // middle C
        expect(n.velocity).toBe(47);
        expect(n.channel).toBeDefined();
        expect(n.channel).toBe(0);
    });
});
//# sourceMappingURL=index.test.js.map