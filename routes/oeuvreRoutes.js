const express = require('express');
const router = express.Router();
const oeuvreController = require('../controllers/oeuvreController');

router.get('/', oeuvreController.getAllOeuvres);
router.get('/:id', oeuvreController.getOeuvreById);
router.post('/', oeuvreController.createOeuvre);
router.put('/:id', oeuvreController.updateOeuvre);
router.delete('/:id', oeuvreController.deleteOeuvre);

module.exports = router;
