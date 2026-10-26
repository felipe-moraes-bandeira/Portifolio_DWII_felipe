import Cabecalho from "./Cabecalho.jsx";
import CardProjeto from "./CardProjeto.jsx";
import Rodape from "./Rodape.jsx";

function App() {
  return (
    <div className="pagina-inicial">
      <Cabecalho />

      <main>
        <p className="eyebrow">PORTFOLIO // 2026</p>
        <h2>Projetos em destaque</h2>

        <div className="cards">
          <CardProjeto
            nome="API do Portfolio em PHP"
            descricao="Meu portfolio com Angular e Angular Material."
            tecnologias="Angular, TypeScript"
            link_github="https://github.com/felipe-moraes-bandeira/2026-DWII-portfolio-angular"
            ano={2026}
          />

          <CardProjeto
            nome="Sistema de Cadastro v1"
            descricao="CRUD em PHP do primeiro trimestre."
            tecnologias="PHP, MariaDB, Bootstrap"
            link_github={null}
            ano={2026}
          />
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default App;