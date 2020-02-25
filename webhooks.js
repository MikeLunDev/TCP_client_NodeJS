const fetch = require("node-fetch");
const batteryWebhook = async (battery, motorType, device_id) => {
  try {
    const content = {
      content: `Battery of vehicle with  **device_id:** ${device_id} has changed to **${battery}**`,
      username: `${motorType} ${device_id}:`
    };
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

const onConnectionWebhook = async (device_id, motorType) => {
  const content = {
    content: `Vehicle with **device_id:** ${device_id} is now **CONNECTED.**`,
    username: `${motorType} ${device_id}:`
  };
  try {
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

const onVehicleTurnOffWebhook = async (device_id, motorType) => {
  const content = {
    content: `Vehicle with **device_id:** ${device_id} has been **TURNED OFF.**`,
    username: `${motorType} ${device_id}:`
  };
  try {
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

const onVehicleTurnOnWebhook = async (device_id, motorType) => {
  const content = {
    content: `Vehicle with **device_id:** ${device_id} has been **TURNED ON.**`,
    username: `${motorType} ${device_id}:`
  };
  try {
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

const onPositionChangeWebhook = async (device_id, motorType, lat, lng) => {
  const content = {
    content: `Vehicle with **device_id:** ${device_id} changed **POSITION.**
    **New position** : ${lat} ${lng}
    `,
    username: `${motorType} ${device_id}:`
  };
  try {
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

const onDeviceDisconnectionWebhook = async (device_id, motorType) => {
  const content = {
    content: `Vehicle with **device_id:** ${device_id} has now **DISCONNECTED.**`,
    username: `${motorType} ${device_id}:`
  };
  try {
    await fetch("https://discordapp.com/api/webhooks/681194829194985529/lfZOw4hBXQNj47K3F5agWXvj3doNptgfBF6xUxQdpEYgqUFzJjadihFlKShOkz_ytlkq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(content)
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  batteryWebhook,
  onConnectionWebhook,
  onVehicleTurnOffWebhook,
  onVehicleTurnOnWebhook,
  onPositionChangeWebhook,
  onDeviceDisconnectionWebhook
};
