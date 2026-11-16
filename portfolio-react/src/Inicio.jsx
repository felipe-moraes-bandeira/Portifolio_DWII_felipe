import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <section>
      <p className="eyebrow">PORTFOLIO // 2026</p>
      <h2>Olá, seja bem-vindo!</h2>
      <p className="texto">
        Este portfólio reúne os projetos desenvolvidos na disciplina de
        Desenvolvimento Web II. Ele está em construção e vai crescendo
        ao longo do ano.
      </p>

      <div className="acoes">
        <Link to="/projetos" className="botao">Ver projetos</Link>
        <Link to="/contato" className="botao botao-secundario">Falar comigo</Link>
      </div>
    </section>
  );
}

export default Inicio;
