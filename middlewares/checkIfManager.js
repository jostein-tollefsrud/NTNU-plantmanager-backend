// @ts-check

/**
 * Check if the user is a manager
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next - Callback function
 * @returns {Response} - Status 401, unauthoried message
 */
const checkIfManager = (req, res, next) => {
    const manager = req.user.role === 'manager';
    const user = req.user;
    if (!user) return res.redirect([401], '/login');
    if (!manager) {
        // res.status(401).json({ message: 'Unauthorized' })
        return res.redirect([401], '/')
    }
    next()
}

module.exports = {
    checkIfManager
}