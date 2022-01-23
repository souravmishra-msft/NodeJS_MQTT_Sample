/** MQTT Broker with MongoDB */
const path = require('path');
const mosca = require('mosca');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Message = require('./model/message_model');

dotenv.config({path: '.env'});

/** DB Connection */
const db = process.env.DB_CONNECT;
mongoose.connect(db)
        .then(() => console.log(`Server successfully connected to DB....`))
        .catch((err) => console.log(`DB Connection failed....\n ${err}`));


const settings = {port: 1883};
const broker = new mosca.Server(settings);

broker.on('ready', () => {
    console.log(`Broker is ready.`);
});

// Receive the data from Publisher
broker.on('published', (packet) => {
    let message = packet.payload.toString();
    console.log(`Message received from Publisher: ${message}`);
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt') {
        const msgObj = new Message({
            message: message,
        });
        console.log(`Message-DB: ${message}`);
        msgObj.save((err, msg) => {
            if(err) return console.error(err);
            console.log(`Message saved successfully to DB.`);
        });
    }
});

