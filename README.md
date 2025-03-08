# Restaurant Dashboard

Um dashboard moderno para gerenciamento de restaurantes, construído com Next.js 14 e Styled Components.

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Styled Components
- Axios
- JS Cookie

## Funcionalidades

- 🔐 Autenticação
- 📊 Dashboard com estatísticas
- 🍽️ Gerenciamento de menus
- 📦 Gerenciamento de pedidos
- 👤 Perfil do restaurante

## Estrutura do Projeto

```
src/
├── app/                    # Rotas e layouts (Next.js App Router)
├── components/            # Componentes React reutilizáveis
│   ├── layout/           # Componentes de layout (Navbar, etc)
│   └── ui/               # Componentes de UI (Button, Loading, etc)
├── lib/                  # Utilitários e configurações
│   └── api/             # Serviços de API
├── styles/              # Estilos e tema
└── types/               # Definições de tipos TypeScript
```

## Começando

1. Clone o repositório:
```bash
git clone https://github.com/igorbrandao18/restaurant-dashboard.git
cd restaurant-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000 # URL da API
```

## Autenticação

O sistema utiliza autenticação baseada em token JWT, armazenado em cookies para maior segurança. O middleware do Next.js protege as rotas do dashboard, redirecionando usuários não autenticados para a página de login.

## Estilização

O projeto utiliza Styled Components com um tema consistente definido em `src/styles/theme.ts`. Os componentes são estilizados de forma modular e reutilizável.

## API

A comunicação com o backend é feita através do Axios, com interceptors configurados para:
- Adicionar o token de autenticação automaticamente
- Tratar erros de autenticação
- Redirecionar para login quando necessário

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
