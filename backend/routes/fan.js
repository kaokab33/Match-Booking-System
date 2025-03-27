const express = require('express');
const router = express.Router();
const { getTickets, editFan, bookTicket, cancelTicket, bookedTickets } = require('../controllers/fan');

const verifyToken = require('../middleware/verifyToken');
router.put('/edit', verifyToken, editFan);
router.post('/bookTicket', verifyToken, bookTicket);
router.delete('/cancelTicket/:ticketId', verifyToken, cancelTicket);
router.get('/bookedTickets/:matchId', verifyToken, bookedTickets);
router.get('/getTickets/:userId', verifyToken, getTickets);

module.exports = router;
