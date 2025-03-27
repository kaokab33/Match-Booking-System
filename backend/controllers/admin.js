const User = require('../models/user');
const approveOrDisapproveUser = async (req, res) => {
    try {
        const { userId, action } = req.body;

        if (!['approve', 'disapprove'].includes(action)) {
            return res.status(400).json({ msg: 'Invalid action' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.status = action === 'approve' ? 'approved' : 'disapproved';
        await user.save();

        res.status(200).json({ msg: `User has been ${action}d`, user });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ msg: 'User has been deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const getApprovedUsers = async (req, res) => {
    try {
        const approvedUsers = await User.find({
            status: 'approved',
            role: { $in: ['Fan', 'Manager'] },
        });

        res.status(200).json(approvedUsers);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};


const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'pending' });
        res.status(200).json(pendingUsers);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};



module.exports = { approveOrDisapproveUser, deleteUser, getApprovedUsers, getPendingUsers };