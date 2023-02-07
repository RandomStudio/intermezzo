# Prestissimo

Making MIDI interfacing with NodeJS even easier. Quick, quicker... [prestissimo](https://en.wiktionary.org/wiki/prestissimo)!

Depends on [node-midi](https://github.com/justinlatimer/node-midi) - excellent for the low-level interface, but not particularly easy to use. Also inspired by [easymidi](https://github.com/dinchak/node-easymidi) which works well but lacks TypeScript support and some other conveniences.

## Functionality

This module currently only supports input/output for the following types of MIDI messages:

- "note on"
- "note off"
- "control change"

It does not (yet) support

- pitch bend, sysex messages, etc.

## Install and import

```
npm install prestissimo
```

Import into Node Javascript:

```
const { findInput, findOutput } = require('prestissimo');
```

Or in your Typescript application:

```
import {  findInput, findOutput } from 'prestissimo'
```

Either way, if you're using an editor that understands Typescript definitions (e.g. VS Code), you will get handy hints for function parameters and return types. Nice!

## Usage

### Input

Connect a keyboard, controller, pedal or some other MIDI device and identify it either by **name** or **port number**. For example:

```
const { findInput } = require('prestissimo');
const input = findInput({ name: "Samson Graphite M25" });
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
const { findOutput } = require('prestissimo');
const output = findOutput({name: "myMidiOutput"})
```

Send messages to the device:

```
output.send("noteOn", {
  note: 60,
  velocity: 127,
  channel: 0
});
```

### Virtual Inputs and Outputs

If you need to create virtual (software-only) MIDI devices on your system, simply use `createVirtualInput` instead of `findInput` and `createVirtualOutput` instead of `findOutput`. All other functionality is identical.

### Utils

If you have prestissimo installed as a local or global dependency, you should be able to run

```
npx midi-list
```

... to get a list of available **input** and **output** MIDI devices available on your system, with full names and port numbers.

or

```
npx midi-listen
```

... to listen on all available MIDI Input channels and print out some useful info on any incoming notes, CC values, etc.
