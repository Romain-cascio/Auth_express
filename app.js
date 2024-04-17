const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de vérification du token
function verifyToken(req, res, next) {
  const token = req.header('token');

  if (!token) {
    return res.status(403).json({ message: "Token manquant" });
  }

  if (token !== "42") {
    return res.status(403).json({ message: "Token invalide" });
  }

  next();
}

// Route GET /hello
app.get('/hello', (req, res) => {
  res.send('<h1>hello</h1>');
});

// Route GET /restricted1
app.get('/restricted1', verifyToken, (req, res) => {
  res.json({ message: "topsecret" });
});

// Route GET /restricted2
app.get('/restricted2', verifyToken, (req, res) => {
  res.send('<h1>Admin space</h1>');
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Page non trouvée");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
