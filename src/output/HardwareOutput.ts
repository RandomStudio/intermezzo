import { BaseOutputDevice } from ".";
import { DeviceDescription } from "../types";

export class HardwareOutput extends BaseOutputDevice {
  constructor(filter: DeviceDescription) {
    super(filter, false);
  }
}
