const express = require('express');
const isAdmin = require('../middleware/admin');
const { approveOrDisapproveUser, deleteUser, getApprovedUsers, getPendingUsers }
    = require('../controllers/admin');

const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.delete('/delete/:userId', verifyToken, isAdmin, deleteUser)
router.post('/approve', verifyToken, isAdmin, approveOrDisapproveUser)

router.get('/approved', verifyToken, isAdmin, getApprovedUsers)
router.get('/pending', verifyToken, isAdmin, getPendingUsers)
module.exports = router;