'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const flightModel = new Schema({
    race_number: {
        type: String,
        required: true
    },
    departure_city: {
        type: String,
        required: true
    },
    arrival_city: {
        type: String,
        required: true
    },
    type_aircraft: {
        type: String
    },
    time: {
        type: Date,
        required: true
    },
    actual_time: {
        type: Date
    },
    status: {
        type: String,
        enum: ['вылетел', 'приземлился', 'идет посадка', 'задержан']
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Flight', flightModel);