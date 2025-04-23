// ✅ Correction complète pour permettre l'inscription avec deux images

const express = require('express');
const router = express.Router();
const professionnelController = require('../controllers/Procontroller');
const multer = require('multer');
const path = require('path');

// ✅ Configuration de multer avec diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post(
  '/register',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]),
  professionnelController.createProfessionnel
);

router.get('/', professionnelController.getAllProfessionnels);
router.get('/:id', professionnelController.getProfessionnelById);
router.post('/', upload.single('image'), professionnelController.createProfessionnel);
router.put('/:id', professionnelController.updateProfessionnel);
router.delete('/:id', professionnelController.deleteProfessionnel);

module.exports = router;
