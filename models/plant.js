const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    waterFrequency: {
        type: Number,
        required: true
    },
    fertilizingFrequency: {
        type: Number,
        required: true,
    },
    light: {
        type: String,
        enum: ['shadow', 'direct sunlight', 'indirect sunlight'],
        required: true
    },
    lastWateredByUser: {
        type: String,
        default: ''
    },
    lastWateredAtTime: {
        type: Date,
        default: 'Jan 1, 1970'
    },
    lastFertilizedByUser: {
        type: String,
        default: ''
    },
    lastFertilizedAtTime: {
        type: Date,
        default: 'Jan 1, 1970'
    }
});

const Plant = mongoose.model('plant', PlantSchema);
module.exports = Plant;