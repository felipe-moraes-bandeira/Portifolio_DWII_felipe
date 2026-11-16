# Portfólio DWII

Projeto desenvolvido para a disciplina **Desenvolvimento Web II (DWII)** do Instituto Federal do Paraná (IFPR). O portfólio existe em duas versões de front-end, **Angular** e **React**, que consomem a mesma API (Node.js ou PHP) ligada a um banco **MariaDB**.

---

## 👨‍🎓 Autor

- **Nome:** Felipe Moraes Bandeira
- **Curso:** Técnico em Informática Integrado ao Ensino Médio
- **Instituição:** IFPR – Campus Ponta Grossa
- **Disciplina:** Desenvolvimento Web II
- **Ano:** 2026
- **Professor:** Dr. Prof. João Berssa

---

## 🎯 Objetivo do Projeto

Construir um portfólio pessoal para reunir os trabalhos feitos ao longo do ano letivo. O projeto foi crescendo por etapas: primeiro o front-end em Angular, depois uma API em PHP, uma segunda API em Node.js, a ligação com o banco de dados, a proteção das rotas de escrita com token e, por fim, uma versão do front-end em React.

---

## 🧱 Arquitetura

```text
┌──────────────────┐        ┌───────────────────┐        ┌──────────────┐
│ portfolio-angular│        │  api-node (:3000) │        │              │
│  (Angular :4200) │──────▶ │  Express + JWT    │──────▶ │   MariaDB    │
├──────────────────┤        ├───────────────────┤        │   dwii_db    │
│  portfolio-react │──────▶ │  api/ (PHP :8000) │──────▶ │              │
│   (Vite :5173)   │        │  PDO              │        └──────────────┘
└──────────────────┘        └───────────────────┘
```

---

## 🚀 Tecnologias Utilizadas

**Front-end Angular**
- Angular 21.2.16, Angular CLI 21.2.14 e Angular Material 21.2.14
- TypeScript 5.9.3
- RxJS e `HttpClient`

**Front-end React**
- React 19 e React DOM
- React Router (`react-router-dom`)
- Vite

**Back-end**
- Node.js 24.14.0 e npm 11.9.0
- Express, `cors`, `mysql2`
- `bcryptjs` (hash de senhas) e `jsonwebtoken` (JWT)
- PHP com PDO (API alternativa)

**Banco de dados**
- MariaDB (`dwii_db`)

---

## 📁 Estrutura do Projeto

```text
Portifolio_DWII_felipe/
├── api/                    # API em PHP
│   ├── projetos.php
│   ├── tecnologias.php
│   └── contato.php
├── api-node/               # API em Node.js
│   ├── server.js
│   ├── db.js
│   └── criar-usuario.js
├── portfolio-angular/      # Front-end Angular
│   └── src/app/
│       ├── home/
│       ├── sobre/
│       ├── projetos/
│       ├── estatisticas/
│       ├── catalogo/
│       ├── gestao/
│       ├── contato/
│       └── app.routes.ts
├── portfolio-react/        # Front-end React
│   └── src/
│       ├── App.jsx
│       ├── Cabecalho.jsx
│       ├── Inicio.jsx
│       ├── Projetos.jsx
│       ├── CardProjeto.jsx
│       ├── Contato.jsx
│       ├── Rodape.jsx
│       └── api.js
├── sql/
│   ├── setup.sql           # banco, tabelas e dados de exemplo
│   └── usuarios.sql        # tabela de usuários (login)
└── conexao.php             # conexão PDO usada pela API em PHP
```

---

## ✨ Funcionalidades

### Versão Angular

| Rota | Página | O que faz |
| --- | --- | --- |
| `/` | Início | Apresenta o portfólio e o objetivo do projeto |
| `/sobre` | Sobre | Informações pessoais e acadêmicas do autor |
| `/projetos` | Projetos | Lista os projetos vindos da API |
| `/estatisticas` | Estatísticas | Calcula quantidade de projetos por tecnologia e por ano |
| `/catalogo` | Catálogo | Lista as tecnologias cadastradas, com Angular Material |
| `/gestao` | Gestão | Formulário para criar, editar e excluir projetos |
| `/contato` | Contato | Formulário que envia a mensagem para a API em PHP |

O item ativo do menu é destacado com `routerLinkActive`, e qualquer rota desconhecida redireciona para o início.

### Versão React

| Rota | Página | O que faz |
| --- | --- | --- |
| `/` | Início | Boas-vindas com atalhos para Projetos e Contato |
| `/projetos` | Projetos | Mostra os projetos da API Node e os repositórios públicos do GitHub |
| `/contato` | Contato | Formulário de contato (por enquanto só exibe uma confirmação na tela, sem enviar ao servidor) |

- A navegação usa `NavLink` do React Router, que marca o link da página atual.
- O botão "Ver no GitHub" só aparece quando o projeto tem link.
- Na página Projetos, os repositórios são buscados em `api.github.com/users/<usuário>/repos`. Forks e repositórios que já vêm da API não aparecem duplicados.

---

## ⚙️ Como Rodar

### 1. Banco de dados

O MariaDB precisa estar ligado **antes** de subir a API.

```bash
sudo service mariadb start
sudo mariadb < sql/setup.sql
sudo mariadb dwii_db < sql/usuarios.sql
```

O `setup.sql` cria o banco `dwii_db`, o usuário `dwii_user`, as tabelas `projetos`, `tecnologias` e `contatos` e alguns dados de exemplo. O `usuarios.sql` cria a tabela `usuario`, usada no login. As credenciais ficam em `api-node/db.js` e `conexao.php`.

> ⚠️ A senha do banco está escrita no código por ser um projeto de estudo. Em um projeto real, use variáveis de ambiente.

### 2. API em Node.js

```bash
cd api-node
npm install
node server.js
```

A API sobe em `http://localhost:3000`. Teste com:

```bash
curl -i http://localhost:3000/api/projetos
curl -i http://localhost:3000/api/projetos/5
curl -i http://localhost:3000/api/tecnologias
```

### 3. API em PHP (usada pelo formulário de contato do Angular)

Na raiz do projeto:

```bash
php -S 0.0.0.0:8000
```

### 4. Front-end Angular

```bash
cd portfolio-angular
npm install
npm start
```

Abre em `http://localhost:4200`.

### 5. Front-end React

```bash
cd portfolio-react
npm install
npm run dev
```

Abre em `http://localhost:5173`.

### Configurando a URL da API

Os front-ends precisam saber onde a API está:

- **React:** arquivo `portfolio-react/src/api.js`
- **Angular:** arquivos `projeto.service.ts`, `tecnologia.service.ts` e `contato.service.ts`, em `portfolio-angular/src/app/`

Rodando tudo na sua máquina, use `http://localhost:3000`. No **GitHub Codespaces**, use a URL pública da porta (algo como `https://<nome-do-codespace>-3000.app.github.dev`) e deixe a porta como **Pública** na aba *Portas*.

---

## 🔌 Rotas da API Node

Todas as rotas de leitura leem do banco `dwii_db`. O contrato de `GET /api/projetos` é o mesmo do `api/projetos.php`.

| Método | Rota | Token | Descrição |
| --- | --- | :---: | --- |
| `GET` | `/api/projetos` | não | Lista os projetos com status `publicado` |
| `GET` | `/api/projetos/:id` | não | Busca um projeto pelo id |
| `GET` | `/api/tecnologias` | não | Lista as tecnologias |
| `POST` | `/api/login` | não | Recebe `email` e `senha` e devolve um token JWT (válido por 2 horas) |
| `POST` | `/api/projetos` | sim | Cria um projeto |
| `PUT` | `/api/projetos/:id` | sim | Atualiza um projeto |
| `DELETE` | `/api/projetos/:id` | sim | Exclui um projeto |

---

## 🔒 Autenticação (a tranca)

Quem escreve precisa de um token. As rotas `POST`, `PUT` e `DELETE` exigem o cabeçalho `Authorization: Bearer <token>`. Sem ele, a API responde `401`.

**1. Crie o usuário dono** (uma vez só, com a tabela `usuario` já criada):

```bash
cd api-node
node criar-usuario.js dono@portfolio.dev <sua-senha>
```

**2. Faça login e pegue o token:**

```bash
curl -i -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dono@portfolio.dev","senha":"<sua-senha>"}'
```

**3. Use o token numa rota protegida:**

```bash
curl -i -X POST http://localhost:3000/api/projetos \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Novo projeto","descricao":"Teste","tecnologias":"Node","ano":2026}'
```

---

## 🛠️ Problemas comuns

- **A lista de projetos não carrega:** confira se o MariaDB e a `node server.js` estão rodando e se a URL em `api.js` (React) ou nos `*.service.ts` (Angular) está correta.
- **Erro de CORS ou bloqueio no Codespaces:** deixe a porta da API como **Pública** na aba *Portas*.
- **`Failed to resolve import` no Vite:** o arquivo não existe ou o nome está com maiúscula/minúscula diferente. Em Linux, `Projetos.jsx` e `projetos.jsx` são arquivos diferentes.
- **Os repositórios do GitHub não aparecem:** o GitHub limita a 60 requisições por hora sem login. Espere um pouco e recarregue.

---

## 📚 Histórico das aulas

O 3º trimestre é dividido em dois arcos: o **arco A** é a API em Node (Aulas 21 a 24, fechado com a Entrega A) e o **arco B** é o front em React (Aulas 25 a 28, com a Entrega B no fim).

### Arco A: API em Node

- **Aula 21:** API em Node (`api-node/`) com o mesmo contrato do `api/projetos.php`.
- **Aula 22:** a API passa a ler os dados do banco `dwii_db`.
- **Aula 23:** a API passa a escrever no banco (`POST`, `PUT` e `DELETE`).
- **Aula 24:** rotas de escrita protegidas por token (JWT).

### Arco B: Portfólio em React

- **Aula 25: o Portfólio em React nasce.** Projeto criado com o Vite na pasta `portfolio-react/` (`npm run dev`, porta 5173). A tela vira uma função que devolve JSX, separada em componentes: `Cabecalho`, `CardProjeto` (que recebe nome, descrição, tecnologias, link e ano por **props**) e `Rodape`.
- **Aula 26: estado e lista.** Os projetos saem do `App` e viram dados, e o `map` desenha um card para cada item, com `key`. O formulário de contato passa a ser **controlado**, guardando o que a pessoa digita com `useState`.
- **Aula 27: efeito e dado remoto.** Os projetos passam a vir da API Node, com `fetch` dentro de um `useEffect`. A tela mostra os três momentos de um pedido: *carregando*, *erro* e *chegou*. Para o navegador aceitar a resposta, a API usa `cors()` e a porta 3000 precisa estar **Pública** no Codespace. Também entra o catálogo de tecnologias, lido de `GET /api/tecnologias`.
