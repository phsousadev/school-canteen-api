# 🍽️ School Canteen API

API para gerenciar pedidos de uma cantina escolar, com dois perfis de usuários: **alunos/responsáveis** e **administradores**.

---

## ⚙️ Tecnologias

- 🟢 **Node.js** — Plataforma principal do backend.
- ⚡ **Fastify** — Framework web ultrarrápido e extensível.
- 🧪 **Vitest** — Testes unitários de alta performance com excelente DX.
- 🐘 **MySQL** — Banco de dados relacional robusto.
- 🔐 **JWT** — Autenticação segura baseada em tokens.
- 🧭 **Prisma ORM** — Acesso a banco de dados com tipagem forte.
- 🐳 **Docker** — Ambiente isolado e reproduzível.
- 💬 **WebSocket** — Atualizações em tempo real dos pedidos.
- 👮‍♂️ **RBAC (Role-Based Access Control)** — Controle de acesso por cargo.
- 🧹 **ESLint** — Linting de código com regras padronizadas.
- 🛠️ **CI com GitHub Actions** — Pipeline automatizado de testes.
- 🧠 **S.O.L.I.D Principles** — Arquitetura orientada a boas práticas de design de software.

---

## ✨ Diferenciais

- 📡 Notificações em tempo real para cozinha.
- 📈 Dashboard administrativo com gráficos.
- 🔒 Controle granular de permissões com CASL.

---

## 💻 Requisitos Básicos

Antes de rodar o projeto, certifique-se de ter instalado na sua máquina:

- **Docker** (para rodar o banco de dados e serviços)
- **Node.js** (versão 22 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode baixar e instalar:

- Docker: https://docs.docker.com/get-docker/
- Node.js (inclui npm): https://nodejs.org/

---

## 🌐 API em Produção

A API está disponível em produção no link:

[https://school-canteen-api.onrender.com](https://school-canteen-api.onrender.com)

---

## ☕ Teste com Insomnia

Baixe a coleção Insomnia para facilitar testes:

[school-canteen-api-insomnia.yaml](./infra/school-canteen-api-insomnia.yaml)

Importe no Insomnia: **Import / Export > Import Data > From File**.

> Configure o token JWT nas requisições protegidas.

---

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/phsousadev/school-canteen-api.git
```

### 2. Entre na pasta do projeto

```bash
cd school-canteen-api
```

### 3. Suba o container com o banco de dados Postgres

```bash
docker compose up -d
```

### 4. Instale as dependências do projeto

```bash
npm install
```

### 5. Criando o arquivo `.env`

Copie o arquivo `.env.example` para um novo arquivo `.env` na raiz do projeto, mantendo as mesmas configurações iniciais:

```bash
cp .env.example .env
```

## Testes unitários
Execute: 

```bash
npm run test:unitary
```
