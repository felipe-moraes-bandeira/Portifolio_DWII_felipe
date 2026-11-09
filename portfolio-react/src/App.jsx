
import Cabecalho from "./Cabecalho.jsx";
import CardProjeto from "./CardProjeto.jsx";
import Rodape from "./Rodape.jsx";
import projetos from "./projetos.js";
import Contato from "./Contato.jsx";

function App() {
  return (
    <div className="pagina-inicial">
      <Cabecalho />

      <main>
        <p className="eyebrow">PORTFOLIO // 2026</p>
        <h2>Projetos em destaque</h2>

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
