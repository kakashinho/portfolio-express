const express = require('express');
const router = express.Router();

const { disciplinasData } = require('../utils/dataStore');

function padronizarStatus(disciplinas) {
    return disciplinas.map(d => {
        if (d.status.toLowerCase().includes('aprovado')) {
            d.status = 'Concluída';
        } else if (d.status.toLowerCase().includes('curso') && d.status.length < 15) {
            d.status = 'Em Curso';
        } else if (d.status.toLowerCase().includes('não cursada')) {
            d.status = 'Não Cursada';
        }
        return d;
    });
}

router.get('/api/disciplinas', (req, res) => {
    res.json(disciplinasData);
});

router.post('/api/disciplinas', (req, res) => {
    const disciplinas = req.body;

    if (!Array.isArray(disciplinas)) {
        return res.status(400).json({ error: "O corpo da requisição deve ser um array de disciplinas." });
    }

    for (let i = 0; i < disciplinas.length; i++) {
        const { nome, media, frequencia, semestre, ano, status } = disciplinas[i];
        if (!nome || media == null || frequencia == null || !semestre || !ano || !status) {
            return res.status(400).json({ 
                error: `Disciplina na posição ${i} está incompleta.` 
            });
        }
    }

    disciplinasData.length = 0;

    disciplinasData.push(...padronizarStatus(disciplinas));

    res.status(201).json({ message: "Disciplinas adicionadas com sucesso.", total: disciplinasData.length });
});

router.put('/api/disciplinas/:nome', (req, res) => {
    const nomeParam = decodeURIComponent(req.params.nome).toLowerCase();
    const body = Array.isArray(req.body) ? req.body[0] : req.body;

    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: "Corpo da requisição inválido." });
    }

    const index = disciplinasData.findIndex(d => d.nome.toLowerCase() === nomeParam);

    if (index === -1) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
    }

    disciplinasData[index] = { ...disciplinasData[index], ...body };

    res.json({ message: "Disciplina atualizada com sucesso.", disciplina: disciplinasData[index] });
});

router.delete('/api/disciplinas/:nome', (req, res) => {
    const nome = decodeURIComponent(req.params.nome);
    const index = disciplinasData.findIndex(d => d.nome === nome);

    if (index === -1) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
    }

    const removida = disciplinasData.splice(index, 1);
    res.json({ message: "Disciplina removida com sucesso.", removida });
});

router.delete('/api/disciplinas', (req, res) => {
    disciplinasData.length = 0;
    res.json({ message: "Todas as disciplinas foram removidas." });
});

router.get('/disciplinas', (req, res) => {
    res.render('disciplinas', {
        title: 'Minhas Disciplinas',
        disciplinas: disciplinasData
    });
});

module.exports = router;
