const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => { 
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Événement non trouvé" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const events = await Event.findAll({
            where: { categorie: category.toLowerCase() }
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const {
            titre,
            description,
            categorie,
            adresse,
            tarif,
            partenaires // doit être une string JSON (ex. '["/uploads/img1.jpg"]')
        } = req.body;

        const imageFile = req.files?.image?.[0];
        const videoFile = req.files?.video?.[0];

        const newEvent = await Event.create({
            titre,
            description,
            categorie,
            adresse,
            tarif,
            partenaires: partenaires ? JSON.parse(partenaires) : null,
            image_url: imageFile ? `/uploads/${imageFile.filename}` : null,
            video_url: videoFile ? `/uploads/${videoFile.filename}` : null
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur lors de la création de l'événement" });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.partenaires && typeof req.body.partenaires === "string") {
            req.body.partenaires = JSON.parse(req.body.partenaires);
        }
        const updated = await Event.update(req.body, { where: { id_event: id } });
        if (!updated[0]) return res.status(404).json({ error: "Événement non trouvé" });
        res.json({ message: "Événement mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Event.destroy({ where: { id_event: id } });
        if (!deleted) return res.status(404).json({ error: "Événement non trouvé" });
        res.json({ message: "Événement supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
