# 🍽️ Sistema de Cantina Escolar

Projeto full stack desenvolvido para gerenciar pedidos de uma cantina escolar. O sistema possui dois ambientes:

- 👨‍🎓 Ambiente do Usuário (Alunos e Responsáveis)
- 🧑‍💼 Ambiente Administrativo (Gestores da Cantina)

---

## 📌 Funcionalidades

### 👨‍🎓 Ambiente do Usuário
- Cadastro e login (com autenticação via JWT)
- Visualização de cardápio por categorias (lanches, bebidas, doces, etc)
- Adição de produtos ao carrinho
- Finalização e confirmação de pedido
- Histórico de pedidos realizados

### 🧑‍💼 Ambiente Administrativo
- Login de administrador
- Cadastro, edição e exclusão de produtos do cardápio
- Visualização em tempo real dos pedidos (painel de cozinha)
- Filtro de pedidos por status: pendente, em preparo, pronto, entregue
- Relatórios de vendas por data, produto e usuário

---

## ⚙️ Tecnologias Utilizadas

### 🔧 Backend
- Node.js
- Express.js
- MySQL
- JWT para autenticação
- WebSocket (para atualização em tempo real dos pedidos)
- TypeORM (ORM para MySQL)

### 💻 Frontend
- React.js
- Context API + React Query
- Chart.js (dashboard de vendas)

---

## 📊 Extras Implementados
- 📡 Notificações em tempo real via WebSocket
- 📈 Dashboard com gráficos de vendas
- 🔒 Controle de permissões com CASL

---

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/sistema-cantina-escolar.git
cd sistema-cantina-escolar
