const crypto = require('crypto');
const router = require('express').Router();
const User = require('../models/user');
const Request = require('../models/resetRequests');
const sendResetLink = require('../lib/sendEmail');
const utils = require('../lib/utils');

router.post('/forgot', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        const token = crypto.randomBytes(20).toString('hex');
        const newRequest = new Request({
            token: token,
            email: user.email,
        });

        newRequest.save();
        sendResetLink(user.email, token);
    }

    res.status(200).json('Email have been sent');
});

router.patch('/reset/:id', async (req, res) => {
    try {
        const request = await Request.findOne({ token: req.body.token });
        const user = await User.findOne({ email: request.email });

        if (req.body.password === req.body.confirmPassword) {
            user.password = req.body.password;
            await user.save();

            res.status(200).json('New Password Saved');
        } else {
            res.status(400).json('Passwords need to match');
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

module.exports = router;
