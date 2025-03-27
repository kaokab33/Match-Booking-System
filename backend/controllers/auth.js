const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = "dasjdnwjknejkq";

const register = async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            birthDate,
            gender,
            city,
            address,
            email,
            password,
            role
        } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ msg: 'Username is already taken.' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'Email is already registered.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            firstName,
            lastName,
            birthDate,
            gender,
            city,
            address,
            email,
            password: hashedPassword,
            role,
            status: 'pending',
        });

        const savedUser = await newUser.save();
        res.status(201).json({ msg: 'User registered, waiting for approval', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        if (user.status !== 'approved') {
            return res.status(403).json({ msg: 'Your account is not approved yet.' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { register, login };
