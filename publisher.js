/** MQTT Publisher to publish the messages */
const mqtt = require('mqtt');

// Connect publisher to the broker
const client = mqtt.connect('mqtt:localhost:1883');
const topic = 'TESTTopic123';
let message = 'Hello World using MQTT';

client.on('connect', () => {
    console.log(`Publisher is ready`);
    setInterval(() => {
        client.publish(topic, message);
        console.log(`Message sent from Publisher: `, message);
    }, 5000);
});