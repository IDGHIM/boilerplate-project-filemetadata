const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
require("dotenv").config();
const upload = multer({ storage: multer.memoryStorage() }); 

// Servir les fichiers statiques
app.use(express.static('public'));
app.use(cors());
// Page HTML du formulaire
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Route de soumission du formulaire
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log('ok');
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
    
  }

  // Réponse JSON exactement comme demandé
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
