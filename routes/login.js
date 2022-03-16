const router = require('express').Router();   
const User = require('../models/user');
const utils = require('../lib/utils');

/**
 * -------------- /login --------------
 */

// Validate user and issue a JWT
router.post('/', async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    try {
        if (!user) return res.status(401).json({ message: "You entered the wrong password or email!" });

        const isValid = await utils.validPassword(req.body.password, user.password);
        if (!isValid) return res.status(401).json({ message: "You entered the wrong password or email!" });

        const tokenObject = utils.issueJWT(user);
        res.status(200).json({ user: { id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName, email: user.email }, token: tokenObject.token });
        

    } catch (error) {
        next(error);
    }
});

module.exports = router;
