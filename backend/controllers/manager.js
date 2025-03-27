const Stadium = require('../models/stadium');
const Match = require('../models/match');
const Team = require('../models/team');
const getStadiums = async (req, res) => {
    try {
        const stadiums = await Stadium.find();
        res.status(200).json(stadiums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addMatch = async (req, res) => {
    const match = req.body;
    console.log("dddddddd");
    const newMatch = new Match(match);
    try {
        await newMatch.save();
        console.log(newMatch);
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const addStadium = async (req, res) => {
    const stadium = req.body;
    console.log(stadium);
    const newStadium = new Stadium(stadium);
    try {
        await newStadium.save();
        res.status(201).json(newStadium);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateMatch = async (req, res) => {
    const match = req.body;
    try {
        await Match.findByIdAndUpdate(match._id, match);
        res.status(201).json(match);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getStadium = async (req, res) => {
    try {
        console.log("getStadium");
        const stadium = await Stadium.findOne({ name: req.params.name });
        console.log(stadium);
        res.status(200).json(stadium);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { getStadiums, getMatches, addMatch, addStadium, updateMatch, getStadium, getTeam, getTeams, getMatch }; 
