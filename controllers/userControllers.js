const User = require('../models/user');
const utils = require('../lib/utils');

/**
 * Controllers for user route
 * @module user-controllers
 */

/**
 * -------------- GET /users/:id --------------
 */
/**
 * Get a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const getUserById = async (req, res) => {
    const userToFind = await User.findById(req.params.id).select('-password');
    const userLoggedIn = req.user._id.toString();

    try {
        // Managers can view all users
        const manager = req.user.role === 'manager';
        if (manager) return res.status(200).json(userToFind);

        // Users can only view their own profile
        if (userToFind.id !== userLoggedIn)
            return res.status(401).json({ message: 'Unauthorized' });
        res.status(200).json(userToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }

    /*try {
        return res.status(200).send(userToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }*/
};

/**
 * -------------- GET /users --------------
 */
/**
 * Get all users
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');

    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * -------------- PUT /users/:id --------------
 */
/**
 * Update a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const updateUserById = async (req, res) => {
    try {
        // Managers can edit all user field exept password
        const manager = req.user.role === 'manager';

        const user = await User.findById(req.params.id);
        const { firstName, lastName, role, email } = req.body;
        const emailInDb = await User.findOne({ email: req.body.email });

        if (emailInDb) return res.status(400).json('Email is taken!');

        // Må finne en løsning slik at en bruker kan bruke opp igjen sin gamle email
        // if(req.user.id === user._id)

        if (manager) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.role = role;

            await user.save();
            res.status(200).json(`${user.firstName} have been updated!`);
        } else {
            const userId = req.user.id;
            if (userId !== req.params.id) {
                return res
                    .status(400)
                    .json('You can only update your own profile!');
            }
            user.firstName = firstName;
            user.lastName = lastName;

            await user.save();
            res.status(200).json(`${user.firstName} have been updated!`);
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * -------------- DELETE /users/:id --------------
 */
/**
 * Delete a user by id
 * @param {Object} req - Information about the HTTP request
 * @param {Object} res - Use to send back the desired HTTP response
 */
const deleteUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    // Only managers can delete a user
    const manager = req.user.role === 'manager';
    if (!manager)
        return res.status(400).json('You are not authorized to delete!');

    try {
        user.remove();
        res.status(200).json({
            message: `${user.firstName} ${user.lastName} has been deleted!`,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
