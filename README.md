# 🍽️ School Canteen API

API desenvolvida como parte de um desafio Full Stack com o objetivo de gerenciar **pedidos de uma cantina escolar**. Este backend robusto é a espinha dorsal de uma solução moderna, escalável e em tempo real para dois tipos de usuários: **alunos/responsáveis** e **administradores da cantina**.

---

## 💡 Visão Geral

O sistema contempla **dois ambientes distintos**:

- 👨‍🎓 **Ambiente do Usuário**: onde alunos e responsáveis podem se cadastrar, visualizar o cardápio, fazer pedidos e acompanhar seu histórico.
- 🧑‍💼 **Ambiente Administrativo**: onde administradores gerenciam produtos, acompanham os pedidos em tempo real e extraem relatórios de vendas.

---

## ⚙️ Tecnologias Utilizadas

Este projeto foi construído com foco em escalabilidade, manutenibilidade e boas práticas:

- 🟢 **Node.js** — Plataforma principal do backend.
- ⚡ **Fastify** — Framework web ultrarrápido e extensível.
- 🧪 **Vitest** — Testes unitários de alta performance com excelente DX.
- 🐘 **MySQL** — Banco de dados relacional robusto.
- 🔐 **JWT** — Autenticação segura baseada em tokens.
- 🧭 **Prisma ORM** — Acesso a banco de dados com tipagem forte.
- 🐳 **Docker** — Ambiente isolado e reproduzível.
- 💬 **WebSocket** — Atualizações em tempo real dos pedidos.
- 👮‍♂️ **RBAC (Role-Based Access Control)** — Controle de acesso por cargo.
- 🔐 **CASL** — Controle granular de permissões.
- 🧹 **ESLint** — Linting de código com regras padronizadas.
- 🛠️ **CI com GitHub Actions** — Pipeline automatizado de testes.
- 🧠 **S.O.L.I.D Principles** — Arquitetura orientada a boas práticas de design de software.

---

## ✨ Diferenciais Implementados

- 📡 **Notificações em tempo real** para a cozinha visualizar novos pedidos imediatamente.
- 📈 **Dashboard administrativo com gráficos** de vendas e status de pedidos.
- 🔒 **Controle de permissões detalhado** com CASL, para proteger e modularizar as regras de negócio.

---

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/phsousadev/school-canteen-api.git

