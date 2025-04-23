const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Professionnel = require('../models/Professionnel');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Tentative de connexion :", { email, password });

    // 1️⃣ Chercher d'abord dans les utilisateurs normaux
    let user = await User.findOne({ where: { email } });
    let role = 'user';

    // 2️⃣ Sinon chercher dans les professionnels
    if (!user) {
      user = await Professionnel.findOne({ where: { email } });
      role = 'professionnel';
    }

    // Si aucun user trouvé
    if (!user) {
      console.log("❌ Utilisateur introuvable");
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password || user.mot_de_passe);
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect");
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer le token
    const token = jwt.sign(
      { id: user.id || user.id_user, role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      id_user: user.id || user.id_user,
      nom: user.nom,
      email: user.email,
      role
    });

  } catch (err) {
    console.error("💥 Erreur dans login :", err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    console.log("Données reçues pour inscription :", { username, email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom: username,
      email,
      mot_de_passe: hashedPassword
    });

    res.status(201).json({ message: "Utilisateur enregistré", user: newUser });
  } catch (err) {
    console.error("Erreur d'enregistrement :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { login, register };
