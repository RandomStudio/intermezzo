import { getMessageType, getNote } from "./index";
import { MessageType, MessageTypeName, NoteMessage } from "./types";

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

describe("bytes to message payloads", () => {
  test("middle C noteOn", () => {
    const bytes = [144, 60, 105];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.noteOn);
    expect(MessageTypeName.noteOn).toBe("note on");

    const n: NoteMessage = getNote(bytes);
    expect(n.note).toBe(60); // middle C
    expect(n.velocity).toBe(105);
    expect(n.channel).toBeDefined();
    expect(n.channel).toBe(0);
  });

  test("middle C noteOff", () => {
    const bytes = [128, 60, 47];
    const messageType = getMessageType(bytes);

    expect(messageType).toBe(MessageType.noteOff);
    expect(MessageTypeName.noteOff).toBe("note off");

    const n: NoteMessage = getNote(bytes);
    expect(n.note).toBe(60); // middle C
    expect(n.velocity).toBe(47);
    expect(n.channel).toBeDefined();
    expect(n.channel).toBe(0);
  });
});
