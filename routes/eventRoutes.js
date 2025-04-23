const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../uploads/upload');

// Routes GET
router.get('/', eventController.getAllEvents);
router.get('/category/:category', eventController.getEventsByCategory); // DOIT être AVANT /:id
router.get('/:id', eventController.getEventById);


router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  eventController.createEvent
);

router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
