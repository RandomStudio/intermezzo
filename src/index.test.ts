import { getMessageType } from "./index";
import { MessageType, MessageTypeName } from "./types";

describe("convert types properly from first byte of message", () => {
  test("control change messages", () => {
    const bytes = [177, 7, 72];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.cc);
    expect(MessageTypeName.cc).toBe("control change");
  });

  test("note on messages", () => {
    const bytes = [144, 45, 58];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.noteOn);
    expect(MessageTypeName.noteOn).toBe("note on");
  });

  test("note on messages", () => {
    const bytes = [128, 45, 81];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.noteOff);
    expect(MessageTypeName.noteOff).toBe("note off");
  });

  test("pitch bend messages", () => {
    const bytes = [224, 0, 0];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.pitch);
    expect(MessageTypeName.pitch).toBe("pitch bend");
  });
});
