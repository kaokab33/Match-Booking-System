const User = require('../models/user');
const Ticket = require('../models/ticket');
const bcrypt = require('bcryptjs');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const notifyClients = (data) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

const changeUsername = async (userId, newUsername) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.username = newUsername;
    await user.save();
    return user;
};

const changeEmail = async (userId, newEmail) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.email = newEmail;
    await user.save();
    return user;
};

const changePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return user;
};

const editFan = async (req, res) => {
    const { username, email, password, userId } = req.body;
    try {
        if (username) {
            await changeUsername(userId, username);
        }

        if (email) {
            await changeEmail(userId, email);
        }

        if (password) {
            await changePassword(userId, password);
        }

        const updatedUser = await User.findById(userId);
        res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Server Error' });
    }
};

const cancelTicket = async (req, res) => {
    const ticketId = req.params.ticketId;
    const { futureDate } = req.body;

    try {
        const ticket = await Ticket.findById(ticketId).populate('matchId');
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }
        console.log('Ticket:', 1);
        console.log('Ticket:', futureDate);
        if (!futureDate || isNaN(Date.parse(futureDate))) {
            return res.status(400).json({ msg: 'Invalid future date provided' });
        }

        const currentDate = new Date();
        const futureDateObj = new Date(futureDate);
        const timeDifference = futureDateObj - currentDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference <= 3) {
            return res.status(400).json({ msg: 'Cannot cancel ticket within 3 days of the event' });
        }
        console.log('Ticket:', daysDifference);
        await Ticket.findByIdAndDelete(ticketId);
        res.status(200).json({ msg: 'Ticket cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const bookTicket = async (req, res) => {
    const { matchId, seat, userId, paymentInfo } = req.body;

    try {
        if (!paymentInfo.cardNumber || !paymentInfo.pin) {
            return res.status(400).json({ message: "Payment information is required." });
        }

        const existingTicket = await Ticket.findOne({ matchId, userId });
        if (existingTicket) {
            return res.status(400).json({ message: "You have already booked a ticket for this match." });
        }

        const seatBooked = await Ticket.findOne({ matchId, seat });
        if (seatBooked) {
            return res.status(400).json({ message: "This seat has already been booked by another user." });
        }

        const newTicket = new Ticket({
            matchId,
            seat,
            userId,
            paymentInfo,
        });
        notifyClients({ matchId, seat, userId });

        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const bookedTickets = async (req, res) => {
    console.log("Request params:", req.params);
    const { matchId } = req.params;
    console.log(`Fetching tickets for match ID: ${matchId}`);
    try {
        const tickets = await Ticket.find({ matchId }, 'seat');
        if (!tickets || tickets.length === 0) {
            return res.status(200).json({ bookedSeats: [] });
        }
        const bookedSeats = tickets.map(ticket => ticket.seat);
        console.log('Booked seats:', bookedSeats);
        res.status(200).json({ bookedSeats });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getTickets = async (req, res) => {
    const { userId } = req.params;
    try {
        const tickets = await Ticket.find({ userId }).populate('matchId');
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Server Error' });
    }
};
module.exports = { editFan, bookTicket, cancelTicket, bookedTickets, getTickets };