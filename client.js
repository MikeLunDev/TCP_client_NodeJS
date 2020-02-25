const net = require("net");
let client = new net.Socket();
const port = 7070;
const host = "127.0.0.1";

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
  handleDataFromServer(data);
});

client.on("end", () => {
  console.log("sono nell'end");
  clearInterval(pingIntervalId);
  client.destroy();
  client = null;
  process.exit(1);
});
client.on("error", err => {
  console.log("sono nell'error");
  client.destroy();
  client = null;
  console.log("ERROR: There was an error in the connection.\n", err.message);
});

const handleDataFromServer = async data => {
  let dataStringFromServer = data.toString("ascii"); //.split("\n")
  dataStringFromServer.split("\n").forEach(async command => {
    console.log(command);
    if (dataStringFromServer === "HOW'S IT GOING?") {
      return client.write(
        `FINE. I'M HERE ${scooter.getCurrentLat()} ${scooter.getCurrentLng()}, ${scooter.getCurrentState()} AND CHARGED AT ${scooter.getCurrentBattery()}%.\n`
      );
    }
    let dataArrayFromServer = command.split(" ");
    let newUpdateRateSeconds = parseInt(dataArrayFromServer[4]); //seconds if the message is KEEP ME POSTED EVERY {{seconds}} SECONDS.
    if (
      dataStringFromServer.includes("KEEP ME POSTED EVERY ") &&
      dataStringFromServer.includes("SECONDS.") &&
      !isNaN(newUpdateRateSeconds) &&
      newUpdateRateSeconds <= 3600 &&
      newUpdateRateSeconds >= 10
    ) {
      keepServerPosted(newUpdateRateSeconds);
      return client.write("SURE, I WILL!\n");
    }
    if (command === "HEY YOU, RUN!") {
      //if is RESTING handleRun will be true and the vehicle can be turned on otherwise it will not
      if (isVehicleResting()) {
        scooter.turnVehicleOn();
        scooter.consumeBattery();
        scooter.simulateMovement();
        return client.write("DONE!\n");
      } else {
        return client.write("I CAN'T, SORRY.\n");
      }
    }
    if (command === "HEY YOU, REST!") {
      //if is RESTING handleRun will be true and the vehicle can be turned on otherwise it will not
      if (isVehicleResting()) {
        return client.write("I CAN'T, SORRY!\n");
      } else {
        scooter.turnVehicleOff();
        return client.write("DONE!\n");
      }
    }
    if (command === "GOTTA GO.") {
      await scooter.disconnection();
      client.write("SEE YA.\n");
      client.end();
    }
  });
};

const isVehicleResting = () => {
  return scooter.getCurrentState() === "RESTING";
};

const keepServerPosted = interval => {
  let statusInfoId = setInterval(() => {
    client.write(
      `REPORT. I'M HERE ${scooter.getCurrentLat()} ${scooter.getCurrentLng()}, ${scooter.getCurrentState()} AND CHARGED AT ${scooter.getCurrentBattery()}%.\n`
    );
  }, interval * 1000);
};
