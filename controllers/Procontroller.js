const bcrypt = require('bcrypt');
const Professionnel = require('../models/Professionnel');

// 🔹 Récupérer tous les professionnels
exports.getAllProfessionnels = async (req, res) => {
  try {
    const pros = await Professionnel.findAll();
    res.status(200).json(pros);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Récupérer un professionnel par ID
exports.getProfessionnelById = async (req, res) => {
  try {
    const pro = await Professionnel.findByPk(req.params.id);
    if (!pro) return res.status(404).json({ error: "Professionnel non trouvé" });
    res.status(200).json(pro);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Créer un professionnel avec hash de mot de passe et image
exports.createProfessionnel = async (req, res) => {
    try {
      const {
        prenom,
        nom,
        date_naissance,
        telephone,
        email,
        password,
        activite,
        description
      } = req.body;
  
      const image1 = req.files?.image1?.[0]?.filename
        ? `/uploads/${req.files.image1[0].filename}`
        : null;
      const image2 = req.files?.image2?.[0]?.filename
        ? `/uploads/${req.files.image2[0].filename}`
        : null;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newPro = await Professionnel.create({
        prenom,
        nom,
        date_naissance,
        telephone,
        email,
        password: hashedPassword,
        activite,
        description,
        image_url: image1, // tu peux aussi stocker les deux si tu veux
      });
  
      res.status(201).json(newPro);
    } catch (error) {
      console.error("Erreur dans createProfessionnel :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  };
  

// 🔹 Mettre à jour un professionnel
exports.updateProfessionnel = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Professionnel.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: "Non trouvé" });
    res.status(200).json({ message: "Mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Supprimer un professionnel
exports.deleteProfessionnel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Professionnel.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Non trouvé" });
    res.status(200).json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};