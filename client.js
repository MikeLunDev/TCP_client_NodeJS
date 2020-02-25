const net = require("net");
let client = new net.Socket();
const port = 7070;
const host = "127.0.0.1";
const { handleDataFromServer } = require("./utils/utils");

let scooter = require("./Vehicle");
let pingIntervalId;

client.connect(port, host, function() {
  scooter.isConnecting();
  client.write(`HELLO,  I'M ${scooter.getDeviceId()}!\n`);
  pingIntervalId = setInterval(() => {
    client.write("PING.\n");
  }, 60000);
});

client.on("data", data => {
  handleDataFromServer(data, client);
});

client.on("end", () => {
  clearInterval(pingIntervalId);
  client.destroy();
  client = null;
  process.exit(1);
});
client.on("error", err => {
  client.destroy();
  client = null;
  console.log("ERROR: There was an error in the connection.\n", err.message);
  process.exit(1);
});
