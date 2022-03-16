const router = require('express').Router();
const { checkIfManager } = require('../middlewares/checkIfManager');
const { checkIfGardenerOrManager } = require('../middlewares/checkIfGardenerOrManager');
const {
    createPlant,
    updatePlantById,
    deletePlantById,
    waterPlantById,
    fertilizePlantById
} = require('../controllers/plantController');

router.post('/', checkIfManager, createPlant);

router.put('/:id', checkIfManager, updatePlantById);

router.put('/water/:id', checkIfGardenerOrManager, waterPlantById);

router.put('/fertilize/:id', checkIfGardenerOrManager, fertilizePlantById);

router.delete('/:id', checkIfManager, deletePlantById);

module.exports = router;