"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("messages to bytes", () => {
    test("noteOn middle C", () => {
        const msg = {
            name: "noteOn",
            payload: {
                note: 60,
                velocity: 105,
                channel: 0
            }
        };
        const bytes = _1.messageToBytes(msg);
        expect(bytes).toEqual([144, 60, 105]);
    });
    test("noteOff middle C", () => {
        const msg = {
            name: "noteOff",
            payload: {
                note: 60,
                velocity: 47,
                channel: 0
            }
        };
        const bytes = _1.messageToBytes(msg);
        expect(bytes).toEqual([128, 60, 47]);
    });
});
//# sourceMappingURL=output.test.js.map