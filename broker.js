/** MQTT Broker */

const mosca = require('mosca');

const settings = {port: 1883};
const broker = new mosca.Server(settings);

broker.on('ready', () => {
    console.log(`Broker is ready.`);
});

// Receive the data from Publisher
broker.on('published', (packet) => {
    let message = packet.payload.toString();
    console.log(`Message received from Publisher: ${message}`);
});

