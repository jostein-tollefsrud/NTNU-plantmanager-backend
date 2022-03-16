const router = require('express').Router(); 
const { checkIfManager } = require('../middlewares/checkIfManager');

const { 
    createUser, 
    getUserById, 
    getAllUsers, 
    updateUserById, 
    deleteUserById 
} = require('../controllers/userControllers');

// router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.status(200).json({ success: true, message: "You are successfully authenticated to this route!"});
// });


/**
 * -------------- READ --------------
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: the user object
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/User'
 */
router.get('/', checkIfManager, getAllUsers)
// router.get('/', getAllUsers)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     parameters:
 *       -  in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user id was not found
 */
 router.get('/:id', getUserById);

/**
 * -------------- UPDATE --------------
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update the user by id
 *     tags: [Users]
 *     parameters:
 *       -  in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500: 
 *         description: Some error happened
 */
router.put('/:id', updateUserById)

/**
 * -------------- DELETE --------------
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove a user by id
 *     tags: [Users]
 *     parameters:
 *       -  in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:  
 *         description: The user was not found
 */
router.delete('/:id', checkIfManager, deleteUserById)

module.exports = router;
