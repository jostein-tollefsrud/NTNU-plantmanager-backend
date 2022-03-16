// @ts-check

/**
 * Check if the user is a manager or gardener
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next - Callback function
 * @returns {Response} - Status 401, unauthoried message
 */
 const checkIfGardenerOrManager = (req, res, next) => {
    const gardenerOrManager = req.user.role === 'manager' || req.user.role === 'gardener';
    const user = req.user;
    if (!user) return res.redirect([401], '/login');
    if (!gardenerOrManager) {
        // res.status(401).json({ message: 'Unauthorized' })
        return res.redirect([401], '/')
    }
    next()
}

module.exports = {
    checkIfGardenerOrManager
}