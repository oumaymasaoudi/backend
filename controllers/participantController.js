const Participant = require('../models/Participant');
const Event = require('../models/Event'); // Assure-toi que ce fichier existe dans /models

// Lier les relations
Participant.belongsTo(Event, {
  foreignKey: 'id_event',
  as: 'event'
});

// Récupérer tous les participants avec leurs événements
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      include: [
        {
          model: Event,
          as: 'event'
        }
      ]
    });
    res.status(200).json(participants);
  } catch (error) {
    console.error("Erreur getAllParticipants :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer un participant par ID
exports.getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id, {
      include: [
        {
          model: Event,
          as: 'event'
        }
      ]
    });
    if (!participant) {
      return res.status(404).json({ error: "Participant non trouvé" });
    }
    res.json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Créer un nouveau participant
exports.createParticipant = async (req, res) => {
  try {
    const {
      id_user,
      id_event,
      nom,
      prenom,
      telephone,
      sexe,
      ville,
      motivation,
      date_inscription,
      role 
    } = req.body;

    // Vérification des champs obligatoires
    if (!id_user || !id_event || !nom || !prenom || !telephone || !date_inscription) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const newParticipant = await Participant.create({
      id_user,
      id_event,
      nom,
      prenom,
      telephone,
      sexe,
      ville,
      motivation,
      date_inscription,
      role
    });

    res.status(201).json(newParticipant);
  } catch (error) {
    console.error("Erreur enregistrement participation :", error);
    res.status(500).json({ error: "Erreur serveur lors de la participation" });
  }
};

// Modifier un participant (ex. : modifier la date de participation)
exports.updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Participant.update(req.body, {
      where: { id }
    });

    if (!updated[0]) {
      return res.status(404).json({ error: "Participant non trouvé" });
    }

    res.json({ message: "Participant mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une participation
exports.deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Participant.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Participant non trouvé" });
    }

    res.json({ message: "Participation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
