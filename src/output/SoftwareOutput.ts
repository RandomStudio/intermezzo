import { BaseOutputDevice } from ".";
import { MidiDeviceDetails } from "../types";

export class SoftwareOutput extends BaseOutputDevice {
  constructor(details: MidiDeviceDetails) {
    super(details, true);
  }
}
