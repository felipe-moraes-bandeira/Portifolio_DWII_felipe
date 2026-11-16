import { useEffect, useState } from 'react';
import API from './api.js';
import CardProjeto from './CardProjeto.jsx';

const USUARIO_GITHUB = 'felipe-moraes-bandeira';

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [erroGithub, setErroGithub] = useState('');

  async function buscarProjetos() {
    try {
      const resposta = await fetch(API + '/api/projetos');
      if (!resposta.ok) {
        throw new Error('a API respondeu ' + resposta.status);
      }
      setProjetos(await resposta.json());
    } catch (falha) {
      setErro('Não deu para carregar os projetos: ' + falha.message);
    }
  }

  async function buscarRepos() {
    try {
      const resposta = await fetch(
        'https://api.github.com/users/' + USUARIO_GITHUB +
        '/repos?sort=updated&per_page=30'
      );
      if (!resposta.ok) {
        throw new Error('o GitHub respondeu ' + resposta.status);
      }
      const dados = await resposta.json();
      setRepos(dados.filter((r) => !r.fork));
    } catch (falha) {
      setErroGithub('Não deu para carregar o GitHub: ' + falha.message);
    }
  }

  useEffect(() => {
    Promise.all([buscarProjetos(), buscarRepos()]).finally(() =>
      setCarregando(false)
    );
  }, []);

  // não repete repositório que já veio da sua API
  const links = projetos.map((p) => p.link_github);
  const reposNovos = repos.filter((r) => !links.includes(r.html_url));

  return (
    <section>
      <p className="eyebrow">PROJETOS</p>
      <h2>Projetos em destaque</h2>

      {carregando && <p>Carregando projetos...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="cards">
        {projetos.map((p) => (
          <CardProjeto
            key={p.id}
            nome={p.nome}
            descricao={p.descricao}
            tecnologias={p.tecnologias}
            link_github={p.link_github}
            ano={p.ano}
          />
        ))}

        <CardProjeto
          nome="Sistema de Cadastro v1"
          descricao="CRUD em PHP do primeiro trimestre."
          tecnologias="PHP, MariaDB, Bootstrap"
          link_github={null}
          ano={2026}
        />
      </div>

      <h2 style={{ marginTop: '60px' }}>Meus repositórios no GitHub</h2>

      {erroGithub && <p className="erro">{erroGithub}</p>}

      <div className="cards">
        {reposNovos.map((r) => (
          <CardProjeto
            key={r.id}
            nome={r.name}
            descricao={r.description || 'Sem descrição.'}
            tecnologias={r.language || 'Não informado'}
            link_github={r.html_url}
            ano={new Date(r.created_at).getFullYear()}
          />
        ))}
      </div>
    </section>
  );
}

export default Projetos;