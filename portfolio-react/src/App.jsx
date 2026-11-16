import { useEffect, useState } from 'react';
import API from './api.js';
import Cabecalho from "./Cabecalho.jsx";
import CardProjeto from "./CardProjeto.jsx";
import Rodape from "./Rodape.jsx";
import Contato from "./Contato.jsx";

function App() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarProjetos() {
    try {
      const resposta = await fetch(API + '/api/projetos');

      if (!resposta.ok) {
        throw new Error('a API respondeu ' + resposta.status);
      }

      const dados = await resposta.json();
      setProjetos(dados);
    } catch (falha) {
      setErro('Não deu para carregar os projetos: ' + falha.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProjetos();
  }, []);

  return (
    <div className="pagina-inicial">
      <Cabecalho />

      <main>
        <p className="eyebrow">PORTFOLIO // 2026</p>
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

        <Contato />
      </main>

      <Rodape />
    </div>
  );
}

export default App;