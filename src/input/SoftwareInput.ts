import { BaseInputDevice } from ".";
import { MidiDeviceDetails } from "../types";

export class SoftwareInput extends BaseInputDevice {
  constructor(details: MidiDeviceDetails) {
    super(details, true);
  }
}
