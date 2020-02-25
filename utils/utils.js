let scooter = require("../Vehicle");
let statusInfoId;
const handleDataFromServer = async (data, client) => {
  let dataStringFromServer = data.toString("ascii"); //.split("\n")
  dataStringFromServer.split("\n").forEach(async command => {
    console.log(command);
    if (command === "HOW'S IT GOING?") {
      return client.write(
        `FINE. I'M HERE ${scooter.getCurrentLat()} ${scooter.getCurrentLng()}, ${scooter.getCurrentState()} AND CHARGED AT ${scooter.getCurrentBattery()}%.\n`
      );
    }
    let dataArrayFromServer = command.split(" ");
    let newUpdateRateSeconds = parseInt(dataArrayFromServer[4]); //seconds if the message is KEEP ME POSTED EVERY {{seconds}} SECONDS.
    if (
      command.includes("KEEP ME POSTED EVERY ") &&
      command.includes("SECONDS.") &&
      !isNaN(newUpdateRateSeconds) &&
      newUpdateRateSeconds <= 3600 &&
      newUpdateRateSeconds >= 10
    ) {
      clearInterval(statusInfoId);
      keepServerPosted(newUpdateRateSeconds, client);
      return client.write("SURE, I WILL!\n");
    }
    if (command === "HEY YOU, RUN!") {
      //if is RESTING isVehicleResting() will be true and the vehicle can be turned on otherwise it will not
      if (isVehicleResting()) {
        //simulating movement and triggering webhooks
        scooter.turnVehicleOn();
        scooter.consumeBattery();
        scooter.simulateMovement();
        return client.write("DONE!\n");
      } else {
        return client.write("I CAN'T, SORRY.\n");
      }
    }
    if (command === "HEY YOU, REST!") {
      //if is RESTING isVehicleResting() will be true and the vehicle can't be turned off (because it already is)
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

const keepServerPosted = (interval, client) => {
  statusInfoId = setInterval(() => {
    client.write(
      `REPORT. I'M HERE ${scooter.getCurrentLat()} ${scooter.getCurrentLng()}, ${scooter.getCurrentState()} AND CHARGED AT ${scooter.getCurrentBattery()}%.\n`
    );
  }, interval * 1000);
};

module.exports = {
  handleDataFromServer
};
