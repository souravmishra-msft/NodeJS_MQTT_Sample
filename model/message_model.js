const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
}, {timestamps: true, collection: 'mqtt_sensor_data'});


module.exports = mongoose.model('Message', messageSchema);