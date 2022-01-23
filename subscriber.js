/** MQTT Subscriber, responsible to connect to broker and 
 * receive the messages from publisher 
*/

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'TESTTopic123';

client.on('message', (topic, message) => {
    message = message.toString();
    console.log(`Message received by Subscriber: ${message}`);
});


client.on('connect', () => {
    console.log(`Subscriber is ready.`);
    client.subscribe(topic);
});