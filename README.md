# 📚 Portfólio Acadêmico - Atividade Avaliativa Individual 03

Este projeto é uma atividade avaliativa individual da disciplina de [Nome da Disciplina], com o objetivo de praticar conceitos fundamentais do desenvolvimento web utilizando **Node.js**, **Express.js** e o motor de templates **EJS**.

---

## 🎯 Objetivos da Atividade

O projeto consiste na criação de um **Portfólio Acadêmico** que simula um site pessoal com várias seções, utilizando rotas dinâmicas e renderização de conteúdo com EJS. Os principais objetivos da atividade são:

- Praticar a **criação e organização de rotas** no Express.
- Utilizar o **EJS** para renderizar páginas HTML dinâmicas.
- Exibir **variáveis simples**, **arrays** e **objetos** em páginas HTML.
- Estruturar um site de portfólio com múltiplas seções.
- Implementar as operações básicas de um **CRUD** (GET, POST, PUT, DELETE).

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)

---

## 📁 Estrutura de Rotas

O projeto possui as seguintes rotas principais:

- `/` – **Página Inicial**  
  Exibe uma mensagem de boas-vindas e o nome do estudante.

- `/sobre` – **Sobre Mim**  
  Mostra informações pessoais como nome completo, curso, instituição e ano de ingresso. Os dados são passados como objeto para o EJS.

- `/disciplinas` – **Minhas Disciplinas**  
  Lista de disciplinas cursadas ou em andamento, enviadas ao EJS como um array.

- `/projetos` – **Meus Projetos**  
  Mostra os projetos acadêmicos com título, descrição e link. Os dados são enviados como uma lista de objetos.

- `/contato` – **Contato**  
  Página com informações de contato como e-mail e/ou telefone.

- `/dashboard` – **Dashboard**  
  Exibe estatísticas do portfólio, como:
  - Total de disciplinas
  - Número de projetos concluídos
  - Tecnologias mais utilizadas

---

## 🔄 Funcionalidades CRUD

Além da renderização de páginas, o projeto implementa operações CRUD usando os métodos:

- **GET** – para buscar e exibir dados nas páginas.
- **POST** – para adicionar novos dados (ex.: adicionar um novo projeto).
- **PUT** – para atualizar informações existentes.
- **DELETE** – para remover dados.

---

## 🚀 Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/kakashinho/portfolio-express

   cd portfolio-express

   npm install

   npm start