const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    seat: { type: String, required: true },
    paymentInfo: {
        cardNumber: { type: String, required: true },
        pin: { type: String, required: true },
    },
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
