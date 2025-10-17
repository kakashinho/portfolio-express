const express = require('express');
const router = express.Router();

let sobreData = {};

router.post('/api/sobre', (req, res) => {
  const { fotoDescontraida, informacoesAluno, textoSobre } = req.body;

  if (!fotoDescontraida || !informacoesAluno || !textoSobre) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  sobreData = { fotoDescontraida, informacoesAluno, textoSobre };
  res.status(201).json({ message: "Dados da seção 'Sobre' atualizados com sucesso." });
});

router.get('/api/sobre', (req, res) => {
  if (Object.keys(sobreData).length === 0) {
    return res.status(404).json({ message: "Nenhum dado encontrado para a seção 'Sobre'." });
  }
  res.json(sobreData);
});

router.put('/api/sobre', (req, res) => {
  const { fotoDescontraida, informacoesAluno, textoSobre } = req.body;

  if (Object.keys(sobreData).length === 0) {
    return res.status(404).json({ error: "Nenhum dado para atualizar na seção 'Sobre'." });
  }

  sobreData = {
    fotoDescontraida: fotoDescontraida || sobreData.fotoDescontraida,
    informacoesAluno: informacoesAluno || sobreData.informacoesAluno,
    textoSobre: textoSobre || sobreData.textoSobre,
  };

  res.json({ message: "Dados da seção 'Sobre' atualizados com sucesso.", sobreData });
});

router.delete('/api/sobre', (req, res) => {
  if (Object.keys(sobreData).length === 0) {
    return res.status(404).json({ error: "Nenhum dado para deletar na seção 'Sobre'." });
  }

  sobreData = {};
  res.json({ message: "Dados da seção 'Sobre' deletados com sucesso." });
});

// Página sobre
router.get('/sobre', (req, res) => {
  if (!sobreData) sobreData = {};

  if (!Array.isArray(sobreData.informacoesAluno)) {
    sobreData.informacoesAluno = [];
  }
    res.render('sobre', { sobreData });
});

module.exports = router;