# Portfólio Angular

Projeto desenvolvido para a disciplina **Desenvolvimento Web II (DWII)** do Instituto Federal do Paraná (IFPR), utilizando Angular, Angular Material e TypeScript.

---

## 👨‍🎓 Autor

- **Nome:** Felipe Moraes Bandeira  
- **Curso:** Técnico em Informática Integrado ao Ensino Médio  
- **Instituição:** IFPR – Campus Ponta Grossa  
- **Disciplina:** Desenvolvimento Web II  
- **Ano:** 2026  
- **Professor:** Dr.prof.João Berssa  

---

## 🚀 Tecnologias Utilizadas

- Angular 21.2.16  
- Angular CLI 21.2.14  
- Angular Material 21.2.14  
- Node.js 24.14.0  
- npm 11.9.0  
- TypeScript 5.9.3  

---

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo a construção de um portfólio pessoal utilizando Angular. Ao longo do ano letivo, novas funcionalidades e páginas serão adicionadas para apresentar os projetos desenvolvidos na disciplina de Desenvolvimento Web II.

---

## ✨ Funcionalidades Implementadas

### 🏠 Página Inicial
Apresenta uma introdução ao portfólio, informando que o projeto está em desenvolvimento e servirá para reunir os trabalhos realizados durante o ano.

### 👤 Página Sobre
Contém informações pessoais e acadêmicas do autor, incluindo:
- Apresentação pessoal;
- Formação no curso Técnico em Informática;
- Interesse pela área de desenvolvimento web;
- Objetivos do portfólio.

### 📌 Navegação
Sistema de rotas utilizando Angular Router com as páginas:
- Início  
- Sobre  
- Projetos  
- Contato  

O item ativo do menu é destacado automaticamente com `routerLinkActive`.

---

## 📁 Estrutura do Projeto

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