const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuration de Multer
const upload = multer({ dest: 'uploads/' });

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Utilisation de EJS si tu veux des vues dynamiques (optionnel)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route pour afficher la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html')); // Si tu utilises HTML simple
  // res.render('index'); // Si tu utilises EJS
});

// Route pour gérer l'upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
