const router = require('express').Router();
const User = require('../models/user');
const utils = require('../lib/utils');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing api
 */

/**
 * -------------- CREATE --------------
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: A new user is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * Create a new user
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 * @returns {Promise<Object>} - Store a new user object in the database
 */
router.post('/', async (req, res) => {
    /**
     * -------------- POST /register --------------
     */

    const { firstName, lastName, email, password } = req.body;

    const registeredEmail = await User.findOne({ email: email });
    if (registeredEmail)
        return res
            .status(400)
            .json({ message: 'This email is already registered!' });

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    });

    try {
        newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;
