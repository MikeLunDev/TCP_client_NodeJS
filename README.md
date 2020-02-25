# Project Title

Client TCP application

# Project Description

This is a TCP client that should connect to a TCP server. This client simulate a connected vehicle in particular a scooter. I've developed a class scooter that will simulate (with some limits) the scooter behaviour. This client gets command as datastream from the server, execute them if possible,
and give back a response. If something change in the vehicle webhooks are triggered indicating what has changed. I've decided to use discord webhooks that point to a specific channel
<br>
Server repository [HERE](https://github.com/MikeLunDev/TCP_server_NodeJS)<br>

## Running locally

**Clone the repository and install the dependencies:**

```sh
git clone https://github.com/MikeLunDev/TCP_client_NodeJS
cd TCP_client_NodeJS
npm i
```

**Run the server:**

```sh
node client.js
```

## Built With

- [NodeJs](https://nodejs.org/it/)

## Author

[Michele Lunati](https://github.com/MikeLunDev)
