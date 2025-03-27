const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 100
    }
}, { timestamps: true });

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;