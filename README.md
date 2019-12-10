# Prestissimo

Making MIDI interfacing with NodeJS even easier. Quicker, quicker, _prestissimo_!

## Beta functionality

This module currently only supports input/output for the following types of MIDI messages:

- "note on"
- "note off"
- "control change"

It does not (yet) support

- creating virtual inputs and outputs
- pitch bend, sysex messages, etc.

## Install and import

```
npm install prestissimo
```

Import into Node Javascript:

```
const { Input, Output } = require('prestissimo');
```

Or in your Typescript application:

```
import { Input, Output } from 'prestissimo'
```

Either way, if you're using an editor that understands Typescript definitions (e.g. VS Code), you will get handy hints for function parameters and return types. Nice!

## Usage

### Input

Connect a keyboard or some other MIDI device and identify it either by **name** or **port number**. For example:

```
const { Input } = require('prestissimo');
const input = new Input({ name: "Samson Graphite M25" });
```

This will check the list of available MIDI input devices on your system, and pick the one that (at least partially) matches the name "Samson Graphite M25".

Now register an event handler for "ready", i.e. the device has been found and the port has been opened:

```
input.on("ready", match => {
  console.log('device identified by', match, 'connected');
  // Do stuff now...
});
```

You can register events for specific messages, nicely parsed:

```
input.on("noteOn", payload => {
  const { channel, note, velocity } = payload;
  // do something with the data...
});

input.on("noteOff", payload => {
  const { channel, note, velocity } = payload;
  // do something with the data...
});

input.on("controlChange", payload => {
  const { channel, controller, value } = payload;
  // do something with the data...
})
```

Or listen for "rawMessage" events, which are fired whether prestissimo could parse the message or not:

```
input.on("rawMessage", message => {
  const { deviceName, deltaTime, bytes } = message;
  // Parse the raw bytes yourself?
});
```

### Output

Get a valid output MIDI device by name or port number:

```
const { Output } = require('prestissimo');
const output = new Output({name: "myMidiOutput"})
```

Send messages to the device:

```
output.send("noteOn", {
  note: 60,
  velocity: 127,
  channel: 0
});
```
