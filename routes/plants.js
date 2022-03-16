const router = require('express').Router();
const { checkIfManager } = require('../middlewares/checkIfManager');

const {
    createPlant,
    getPlantById,
    getAllPlants
} = require('../controllers/plantController');

router.post('/', createPlant);

router.get('/', getAllPlants);

router.get('/:id', getPlantById);

module.exports = router;