const express = require('express');
const router = express.Router();

const { state } = require('../utils/dataStore');

async function getGithubStats(username) {
    // sua função para buscar dados do github...
}

router.get('/api/dashboard', async (req, res) => {
    const stats = await getGithubStats(state.GITHUB_USERNAME);
    res.json({
        username: state.GITHUB_USERNAME,
        languageColors: state.LANGUAGE_COLORS,
        githubStats: stats
    });
});

router.post('/api/dashboard', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username é obrigatório' });
    state.GITHUB_USERNAME = username;  // atualiza dentro do objeto compartilhado
    res.json({ message: `Username atualizado para ${username}` });
});

router.put('/api/dashboard', (req, res) => {
    const { language, color } = req.body;
    if (!language || !color) return res.status(400).json({ error: 'language e color são obrigatórios' });
    state.LANGUAGE_COLORS[language] = color;
    res.json({ message: `Cor da linguagem ${language} atualizada para ${color}` });
});

router.delete('/api/dashboard/:language', (req, res) => {
    const lang = req.params.language;
    if (!state.LANGUAGE_COLORS[lang]) return res.status(404).json({ error: 'Linguagem não encontrada' });
    delete state.LANGUAGE_COLORS[lang];
    res.json({ message: `Linguagem ${lang} removida` });
});

module.exports = router;
