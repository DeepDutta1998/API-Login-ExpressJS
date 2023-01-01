const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logRegSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = new mongoose.model('logregapi', logRegSchema);