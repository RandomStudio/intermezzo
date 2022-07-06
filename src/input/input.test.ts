import { SoftwareInput } from "./SoftwareInput";

describe("virtual inputs", () => {
  test("create virtual input", () => {
    const input = new SoftwareInput({ name: "VirtualInputDevice" });

    expect(input).toBeDefined();
    expect(input.getName()).toBe("VirtualInputDevice");

    input.close();
  });
});
