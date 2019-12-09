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
        expect(messageType).toBe(types_1.MessageType.noteOn);
        expect(types_1.MessageTypeName.noteOn).toBe("note on");
    });
    test("note on messages", () => {
        const bytes = [128, 45, 81];
        const messageType = index_1.getMessageType(bytes);
        expect(messageType).toBe(types_1.MessageType.noteOff);
        expect(types_1.MessageTypeName.noteOff).toBe("note off");
    });
});
//# sourceMappingURL=index.test.js.map