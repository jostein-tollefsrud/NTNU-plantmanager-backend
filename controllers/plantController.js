const Plant = require('../models/plant');
//const upload = require('../lib/uploadImage');

const createPlant = async (req, res) => {
    const { name, type, location, waterFrequency, fertilizingFrequency, light } = req.body;

    const newPlant = new Plant({
        name: name,
        type: type,
        location: location,
        waterFrequency: waterFrequency,
        fertilizingFrequency: fertilizingFrequency,
        light: light
    });

    try {
        newPlant.save();
        res.status(200).json(newPlant);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getPlantById = async (req, res) => {
    const plantToFind = await Plant.findById(req.params.id);

    try {
        res.status(200).send(plantToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getAllPlants = async (req, res) => {
    const plants = await Plant.find();

    try {
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const updatePlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        const { name, type, location, waterFrequency, fertilizingFrequency, light } = req.body;

        if (name) plant.name = name;
        if (type) plant.type = type;
        if (location) plant.location = location;
        if (waterFrequency) plant.waterFrequency = waterFrequency;
        if (fertilizingFrequency) plant.fertilizingFrequency = fertilizingFrequency;
        if (light) plant.light = light;

        await plant.save();
        res.status(200).json(`${plant.name} have been updated!`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const waterPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        const managerOrGardener = req.user.role === 'manager' || req.user.role === 'gardener';

        plant.lastWateredByUser = req.user.firstName + ' ' + req.user.lastName;
        plant.lastWateredAtTime = Date.now();

        await plant.save();

        res.status(200).json(`${plant.name} have been watered`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const fertilizePlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        const managerOrGardener = req.user.role === 'manager' || req.user.role === 'gardener';

        plant.lastFertilizedByUser = req.user.firstName + ' ' + req.user.lastName;
        plant.lastFertilizedAtTime = Date.now();

        await plant.save();

        res.status(200).json(`${plant.name} have been fertilized`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deletePlantById = async (req, res) => {
    const plant = await Plant.findById(req.params.id);

    try {
        plant.remove();
        res.status(200).json({ message: `${plant.name} have been deleted`});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    createPlant,
    getPlantById,
    getAllPlants,
    updatePlantById,
    deletePlantById,
    waterPlantById,
    fertilizePlantById
}