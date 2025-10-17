const express = require('express');
const router = express.Router();

let inicioData = {};

router.post('/api/inicio', (req, res) => {
    const { nome, introducao, fotoPerfil, icones, contato } = req.body;

    if (!nome || !introducao || !fotoPerfil || !icones || !contato) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    inicioData = { nome, introducao, fotoPerfil, icones, contato };
    res.status(201).json({ message: "Dados da página inicial atualizados com sucesso." });
});

router.get('/api/inicio', (req, res) => {
    if (Object.keys(inicioData).length === 0) {
        return res.status(404).json({ message: "Nenhum dado encontrado." });
    }
    res.json(inicioData);
});

router.put('/api/inicio', (req, res) => {
    const { nome, introducao, fotoPerfil, icones, contato } = req.body;

    if (Object.keys(inicioData).length === 0) {
        return res.status(404).json({ error: "Nenhum dado para atualizar." });
    }

    inicioData = {
        nome: nome || inicioData.nome,
        introducao: introducao || inicioData.introducao,
        fotoPerfil: fotoPerfil || inicioData.fotoPerfil,
        icones: icones || inicioData.icones,
        contato: contato || inicioData.contato
    };

    res.json({ message: "Dados da página inicial atualizados com sucesso.", inicioData });
});

router.delete('/api/inicio', (req, res) => {
    if (Object.keys(inicioData).length === 0) {
        return res.status(404).json({ error: "Nenhum dado para deletar." });
    }

    inicioData = {};
    res.json({ message: "Dados da página inicial deletados com sucesso." });
});

// Rota da página inicial
router.get('/', (req, res) => {
    if (!inicioData) inicioData = {};
    res.render('index', { inicioData });
});

module.exports = router;