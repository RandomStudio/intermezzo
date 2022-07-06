const { setLoglevel, findInput, createOutput } = require("../dist");

setLoglevel("debug");

console.log("starting example...");

// const input = new HardwareInput({ port: 1 });
// const input = new Input("bla"); // throws error
const input = findInput({ name: "Samson Graphite M25" });

const output = createOutput({ name: "VirtualMidiOutputDevice" });

input.on("ready", (match) => {
  console.log("ready:", match);
});

input.on("rawMessage", (e) => {
  console.log("rawMessage:", e);
});

input.on("noteOn", (e) => {
  console.log("noteOn:", e);
  if (output) {
    output.send("noteOn", {
      note: e.note,
      velocity: e.velocity,
      channel: e.channel,
    });
  }
});

input.on("controlChange", (e) => {
  console.log("controlChange:", e);
});

input.on("noteOff", (e) => {
  console.log("noteOff:", e);
});
