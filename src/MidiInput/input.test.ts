import { createVirtualInput } from "../../dist";

describe("virtual inputs", () => {
  test("create virtual input", () => {
    const input = createVirtualInput({ name: "VirtualInputDevice", port: 0 });

    expect(input).toBeDefined();
    expect(input.getName()).toBe("VirtualInputDevice");

    input.close();
  });
});
