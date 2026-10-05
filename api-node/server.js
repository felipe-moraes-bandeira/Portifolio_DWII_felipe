const express = require('express');
const cors = require('cors');
const app = express();
const PORTA = 3000;
const pool = require('./db');

app.use(cors());
app.use(express.json());
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
app.put('/api/projetos/:id', async (req, res) => {

try {
    const dados = req.body;
    if (!dados || !dados.nome) {
        return res.status(400).json({erro: 'Informe pelo menos o nome do projeto'});
    }
    const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?';
const [resultado] = await pool.execute(sql, [ 
    dados.nome, dados.descricao ?? '', dados.tecnologias ?? '',
      dados.link_github ?? '', dados.ano ?? new Date().getFullYear(), req.params.id
]);
if (resultado.affecteRows === 0) {
    return res.status(404).json({ erro: 'Projeto nao encontrado'});
}
res.json({mensagem: 'Projeto atualizado'});
} catch (erro) {
    res.status(500).json({erro: 'Falha o servidor: '+ erro.message});
}
});

app.delete ('/api/projetos/:id', async (req, res) =>{

    try{
        const [resultado] = await pool.execute('DELETE FROM projetos WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) {
        return res.status(404).json({erro: 'Projeto nao encontrado'});
    }
    res.status(204).end();
    } catch (erro){
        res.status(500).json({erro: ' Falha no servidor: '+erro.message});
    }
});



app.post('/api/projetos', async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);

        if (!dados || !dados.nome) {
            return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
        }

        const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?,?,?,?,?,?)';
        
        const [resultado] = await pool.execute(sql, [
            dados.nome,
            dados.descricao ?? '',           // Se não vier descrição, usa string vazia em vez de null
            dados.tecnologias ?? '',          // Se não vier tecnologias, usa string vazia em vez de null
            dados.link_github ?? null,
            dados.ano ?? new Date().getFullYear(),
            'publicado'
        ]);

        res.status(201).json({ id: resultado.insertId });

    } catch (erro) {
        res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
    }
});

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
