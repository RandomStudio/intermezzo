import { BaseInputDevice } from ".";
import { DeviceDescription } from "../types";

export class HardwareInput extends BaseInputDevice {
  constructor(filter: DeviceDescription) {
    const { name, port } = filter;
    super({ name, port }, false);
  }
}
