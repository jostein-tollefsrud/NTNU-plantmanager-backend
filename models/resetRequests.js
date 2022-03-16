const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '10m',
        default: Date.now
    }
});

const Request = mongoose.model('request', RequestSchema);
module.exports = Request;