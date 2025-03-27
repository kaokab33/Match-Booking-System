const mongoose = require('mongoose');
const StadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 100
    },
    numberOfRows: {
        type: Number,
        required: true,
        min: 1
    },
    numberOfSeatsPerRow: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const Stadium = mongoose.model('Stadium', StadiumSchema);

module.exports = Stadium;