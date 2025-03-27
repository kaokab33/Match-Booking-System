const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    mainReferee: {
        type: String,
        required: true
    },
    linesmen: {
        type: [String],
        required: true,
        validate: [linesmen => linesmen.length === 2, 'There should be exactly two linesmen.']
    }
}, { timestamps: true });

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
