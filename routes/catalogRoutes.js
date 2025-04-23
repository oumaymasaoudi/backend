const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/', catalogController.getAllCatalogs);
router.get('/:id', catalogController.getCatalogById);
router.post('/', catalogController.createCatalog);
router.put('/:id', catalogController.updateCatalog);
router.delete('/:id', catalogController.deleteCatalog);

module.exports = router;