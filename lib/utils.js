require('dotenv').config();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * Helper functions
 * @module helper-functions
 */

/**
 * Use bcrypt library to decrypt the hashed password and then compare it with password the user provided at login form
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password stored in the database
 * @returns {Promise<boolean>} - If valid returns true, else returns false
 */
const validPassword = async (password, hashedPassword) => {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
};

/**
 * Issue the JWT with user info
 * @param {Object} user - The user object.  We need this to set the JWT payload.
 * @returns {Object} - Object with the signed token
 */
const issueJWT = (user) => {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        role: user.role,
        email: user.email,
    };

    const signedToken = jsonwebtoken.sign(payload, process.env.PRIVATE_KEY);

    return {
        token: signedToken,
    };
};

module.exports = {
    validPassword,
    issueJWT,
};
