const express = require('express');
const cors = require('cors');
const app = express();
const PORTA = 3000;
const pool = require('./db');

app.use(cors());

const projetos = [
    {
        id: 1,
        nome: 'Portfolio Angular',
        descricao: 'Meu portfolio com Angular e Angular Material',
        tecnologias: 'Angular, TypeScript',
        link_github: 'https://github.com/felipe-moraes-bandeira/portfolio-angular',
        ano: 2026
    },
    {
        id: 2,
        nome: 'API do portfolio em php',
        descricao: 'Endpoints de projetos e catalogo com PDO e MariaDB.',
        tecnologias: 'PHP, MariaDB',
        link_github: null,
        ano: 2026
    },
    {
        id: 3,
        nome: 'Sistema de Cadastro v1',
        descricao: 'CRUD em PHP do 1 trimestre.',
        tecnologias: 'PHP, MariaDB, Bootstrap',
        link_github: null,
        ano: 2026
    }
];

app.get('/api/projetos', async (req, res) => {
    try {
        const sql = `
            SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE status = 'publicado'
            ORDER BY ano DESC, id
        `;

        const [projetos] = await pool.query(sql);

        res.json(projetos);

    } catch (erro) {
        res.status(500).json({
            erro: 'Falha no servidor: ' + erro.message
        });
    }
});

app.get('/api/projetos/:id', async (req, res) => {
    try {
        const sql = `
            SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE id = ? AND status = 'publicado'
        `;

        const [projetos] = await pool.execute(sql, [req.params.id]);

        if (projetos.length === 0) {
            return res.status(404).json({
                erro: 'Projeto não encontrado'
            });
        }

        res.json(projetos[0]);

    } catch (erro) {
        res.status(500).json({
            erro: 'Falha no servidor: ' + erro.message
        });
    }
});





app.get('/api/tecnologias', async (req, res) => {
    try {
        const sql = `
            SELECT
                id,
                nome,
                categoria,
                descricao,
                ano_criacao
            FROM tecnologias
            WHERE status = 'ativo'
            ORDER BY categoria ASC, nome ASC
        `;

        const [tecnologias] = await pool.query(sql);

        res.status(200).json(tecnologias);

    } catch (erro) {
        console.error('Erro ao listar tecnologias:', erro);

        res.status(500).json({
            erro: 'Falha ao buscar tecnologias.',
            detalhes: erro.message
        });
    }
});


app.get('/', (req, res) => {
    res.send('API do Portfolio em Node: no ar');
});

app.listen(PORTA, () => {
    console.log('API no ar em http://localhost:' + PORTA);
});
