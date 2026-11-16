import { NavLink } from 'react-router-dom';

function Cabecalho() {
  return (
    <header>
      <h1>Meu Portfólio</h1>
      <nav>
        <NavLink to="/" end>Início</NavLink>
    
        <NavLink to="/projetos">Projetos</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>
    </header>
  );
}

export default Cabecalho;
