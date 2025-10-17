const express = require('express');
const router = express.Router();

// Define a rota GET para contato
router.get('/contato', (req, res) => {
  res.render('contato');
});

module.exports = router;