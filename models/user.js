const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         password:
 *           type: string
 *           description: The password of the user, it will be hashed before stored in the DB
 *       example:
 *         id: 60684a760dfc9428979ebbd3
 *         firstName: Ola
 *         lastName: Nordmann
 *         email: ola@mail.com
 *         role: user
 *         password: Password123
 */

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['manager', 'gardener', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    // only hash the password if modified
    if (!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
