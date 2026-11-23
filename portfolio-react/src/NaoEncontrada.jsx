import { Link } from 'react-router-dom';

function NaoEncontrada() {
  return (
    <section>
      <h2>Página não encontrada</h2>
      <p className="texto">Este endereço não existe no Portfólio.</p>

      <div className="acoes">
        <Link to="/" className="botao">Voltar para o início</Link>
      </div>
    </section>
  );
}

export default NaoEncontrada;