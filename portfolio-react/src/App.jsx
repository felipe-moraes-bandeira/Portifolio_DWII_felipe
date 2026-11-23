import { Routes, Route } from 'react-router-dom';
import Cabecalho from './Cabecalho.jsx';
import Rodape from './Rodape.jsx';
import Inicio from './Inicio.jsx';

import Projetos from './Projetos.jsx';
import Contato from './Contato.jsx';
import NaoEncontrada from './NaoEncontrada.jsx';

function App() {
  return (
    <div className="pagina-inicial">
      <Cabecalho />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;