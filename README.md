# Portfólio Angular

Projeto desenvolvido para a disciplina **Desenvolvimento Web II (DWII)** do Instituto Federal do Paraná (IFPR), utilizando Angular, Angular Material e TypeScript.

## Autor

* **Nome:** Felipe Moraes Bandeira
* **Curso:** Técnico em Informática Integrado ao Ensino Médio
* **Instituição:** IFPR – Campus Ponta Grossa
* **Disciplina:** Desenvolvimento Web II
* **Ano:** 2026
* **Professor: Dr.prof.joão Berssa
---

## Tecnologias Utilizadas

* Angular 21.2.16
* Angular CLI 21.2.14
* Angular Material 21.2.14
* Node.js 24.14.0
* npm 11.9.0
* TypeScript 5.9.3

---

## Objetivo do Projeto

Este projeto tem como objetivo a construção de um portfólio pessoal utilizando Angular. Ao longo do ano letivo, novas funcionalidades e páginas serão adicionadas para apresentar os projetos desenvolvidos na disciplina de Desenvolvimento Web II.

---

## Funcionalidades Implementadas

### Página Inicial (Início)

A página inicial apresenta uma breve introdução ao portfólio, informando que o projeto está em desenvolvimento e servirá para reunir os trabalhos realizados durante o ano.

### Página Sobre

A página "Sobre" contém informações pessoais e acadêmicas do autor, incluindo:

* Apresentação pessoal;
* Formação atual no curso Técnico em Informática;
* Interesse pela área de desenvolvimento web;
* Objetivos para o portfólio.

### Navegação

Foi implementado um menu de navegação utilizando Angular Router com as seguintes páginas:

* Início
* Sobre
* Projetos
* Contato

O item correspondente à página atual é destacado automaticamente utilizando `routerLinkActive`.

---

## Estrutura do Projeto

```text
src/
├── app/
│   ├── home/
│   ├── sobre/
│   ├── projetos/
│   ├── contato/
│   ├── app.html
│   ├── app.css
│   └── app.routes.ts
│
├── styles.css
└── main.ts
```

---

## Como Executar

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
ng serve
```

3. Abra o navegador:

```text
http://localhost:4200
```

---

## Atualização desta Etapa

Nesta etapa foram implementados:

* Estrutura inicial do projeto Angular;
* Configuração do Angular Material;
* Página Inicial com conteúdo personalizado;
* Página Sobre com informações pessoais e acadêmicas;
* Sistema de rotas entre páginas;
* Destaque visual da página atual no menu (`routerLinkActive`);
* Estilização personalizada inspirada em carros esportivos, utilizando tons de preto, cinza escuro e vermelho.
