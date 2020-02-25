let UUID = require("uuidjs");
let uuid = UUID.generate();
const fetch = require("node-fetch");
const webhooks = require("./webhooks");

class Vehicle {
  constructor(device_id) {
    this.device_id = device_id;
    this.currentState = "RESTING";
    this.currentBattery = 100;
    this.position = { currentLat: 45.02156165, currentLng: 8.156484 };
    this.motorType = "Scooter";
  }

  getDeviceId = () => {
    return this.device_id;
  };

  getCurrentState = () => {
    return this.currentState;
  };

  getCurrentBattery = () => {
    return this.currentBattery;
  };
  getCurrentLat = () => {
    return this.position.currentLat;
  };
  getCurrentLng = () => {
    return this.position.currentLng;
  };

  turnVehicleOn = async () => {
    await webhooks.onVehicleTurnOnWebhook(this.device_id, this.motorType);
    this.currentState = "RUNNING";
  };
  turnVehicleOff = async () => {
    await webhooks.onVehicleTurnOffWebhook(this.device_id, this.motorType);
    this.currentState = "RESTING";
  };

  isConnecting = async () => {
    await webhooks.onConnectionWebhook(this.device_id, this.motorType);
  };

  disconnection = async () => {
    await webhooks.onDeviceDisconnectionWebhook(this.device_id, this.motorType);
  };

  getRandomCoordinates = (from, to, fixed) => (Math.random() * (to - from) + from).toFixed(fixed) * 1;

  //simulate movement of the vehicle
  simulateMovement = async () => {
    let intervalMovement = setInterval(async () => {
      if (this.currentBattery > 0 && this.currentState !== "RESTING") {
        const currentLat = this.getRandomCoordinates(41, 42, 6);
        const currentLng = this.getRandomCoordinates(11, 12, 6);
        this.position = { currentLat, currentLng };
        await webhooks.onPositionChangeWebhook(this.device_id, this.motorType, this.position.currentLat, this.position.currentLng);
      } else {
        clearInterval(intervalMovement);
      }
    }, 20000);
  };

  //simulate consuming of vehicle's battery
  consumeBattery = () => {
    let intervalBattery = setInterval(async () => {
      if (this.currentBattery > 0 && this.currentState !== "RESTING") {
        this.currentBattery -= 10;
        await webhooks.batteryWebhook(this.currentBattery, this.motorType, this.device_id);
      } else {
        clearInterval(intervalBattery);
      }
    }, 30000);
  };
}

module.exports = new Vehicle(uuid);
