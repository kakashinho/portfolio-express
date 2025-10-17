const express = require('express');
const router = express.Router();
const { projetosData } = require('../utils/dataStore');

router.get('/api/projetos', (req, res) => {
    res.json(projetosData);
});

router.post('/api/projetos', (req, res) => {
    const projetos = req.body;

    if (!Array.isArray(projetos)) {
        return res.status(400).json({ error: "O corpo deve ser um array de projetos" });
    }

    // Validar cada projeto
    for (const p of projetos) {
        const { nome, descricao, imgSrc, htmlSrc } = p;
        if (!nome || !descricao || !imgSrc || !htmlSrc) {
            return res.status(400).json({ error: "Campos obrigatórios: nome, descricao, imgSrc, htmlSrc em cada projeto" });
        }
    }

    // Substituir o array atual
    projetosData.length = 0;  // limpa array existente
    projetos.forEach((p, i) => {
        projetosData.push({
            id: i + 1,
            nome: p.nome,
            descricao: p.descricao,
            imgSrc: p.imgSrc,
            htmlSrc: p.htmlSrc
        });
    });

    res.status(201).json(projetosData);
});

router.put('/api/projetos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, imgSrc, htmlSrc } = req.body;

    const projeto = projetosData.find(p => p.id == id);
    if (!projeto) {
        return res.status(404).json({ error: "Projeto não encontrado" });
    }

    projeto.nome = nome || projeto.nome;
    projeto.descricao = descricao || projeto.descricao;
    projeto.imgSrc = imgSrc || projeto.imgSrc;
    projeto.htmlSrc = htmlSrc || projeto.htmlSrc;

    res.json(projeto);
});

router.delete('/api/projetos/:id', (req, res) => {
    const { id } = req.params;
    const index = projetosData.findIndex(p => p.id == id);
    if (index === -1) {
        return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const removido = projetosData.splice(index, 1);
    res.json({ message: "Projeto removido", projeto: removido[0] });
});

router.get('/projetos', (req, res) => {
    res.render('projetos', {
        title: 'Projetos',
        projetos: projetosData
    });
});


module.exports = router;