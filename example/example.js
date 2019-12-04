const { Input } = require("../dist");

console.log("starting example...");

const input = new Input({ port: 1 });
// const input = new Input("bla"); // throws error
// const input = new Input({ name: "Samson Graphite M25" });

input.on("ready", match => {
  console.log("ready:", match);
});

input.on("rawMessage", e => {
  console.log("rawMessage:", e);
});
