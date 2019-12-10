const { Input, Output } = require("../dist");

console.log("starting example...");

const input = new Input({ port: 1 });
// const input = new Input("bla"); // throws error
// const input = new Input({ name: "Samson Graphite M25" });

const output = new Output({ name: "virtualmidi" });

input.on("ready", match => {
  console.log("ready:", match);
});

input.on("rawMessage", e => {
  console.log("rawMessage:", e);
});

input.on("noteOn", e => {
  console.log("noteOn:", e);
  if (output) {
    output.send("noteOn", {
      note: e.note,
      velocity: e.velocity,
      channel: e.channel
    });
  }
});

input.on("noteOff", e => {
  console.log("noteOff:", e);
});
