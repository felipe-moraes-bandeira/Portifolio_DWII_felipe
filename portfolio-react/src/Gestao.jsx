import { useState } from 'react';
import API from './api.js';
import NovoProjeto from './NovoProjeto.jsx';

// Gestao: a area de quem cuida do Portfolio. Mora no endereco "/gestao".
function Gestao() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [erro, setErro] = useState('');

  // entrar: manda email e senha para a API. Se conferem, ela devolve o token.
  async function entrar(e) {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch(API + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || 'Erro ao autenticar');

      }
localStorage.setItem('item', dados.token);
      setToken(dados.token);
    } catch (falha) {
      setErro('Não deu para entrar: ' + falha.message);
    }
  }

  if (!token) {
    return (
      <section className="gestao">
        <h2>Gestão</h2>
        <form onSubmit={entrar}>
          <label>
            E-mail
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <NovoProjeto token={token} />
          </label>
          <label>
            Senha
            <input
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
        {erro && <p className="erro">{erro}</p>}
      </section>
    );
  }

  // Com token, a tela e a area de gestao.
  return (
    <section className="gestao">
      <h2>Gestão</h2>
      <p>Você entrou. O token está guardado.</p>
      <button onClick={sair}><Sair></Sair></button>
    </section>
  );
}
function sair() {
localStorage.removeItem('token');
setToken('');
}
export default Gestao;