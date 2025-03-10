# Restaurant Dashboard

Um dashboard moderno para gerenciamento de restaurantes, menus e pedidos, desenvolvido com Next.js e TypeScript.

## Visão Geral

Este projeto é um dashboard para restaurantes que permite:

- Gerenciar informações do restaurante
- Criar e editar menus, categorias e itens
- Acompanhar e gerenciar pedidos em tempo real
- Visualizar estatísticas e relatórios

O dashboard consome uma API REST externa para todas as operações de dados.

## Tecnologias Utilizadas

- **Frontend**: Next.js 15 com React 19
- **Tipagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Geração de Código API**: openapi-typescript-codegen
- **Documentação API**: Swagger UI
- **Gerenciamento de Estado**: React Hooks / Context API

## Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd restaurant-dashboard
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Gere o código da API:
   ```bash
   npm run generate-api
   # ou
   yarn generate-api
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse o dashboard em [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
restaurant-dashboard/
├── src/
│   ├── app/                  # Páginas e rotas da aplicação
│   │   ├── api-docs/         # Documentação da API
│   │   ├── dashboard/        # Dashboard principal
│   │   ├── login/            # Página de login
│   │   ├── globals.css       # Estilos globais
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Página inicial
│   ├── components/           # Componentes reutilizáveis
│   ├── contexts/             # Contextos React
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Bibliotecas e utilitários
│   ├── scripts/              # Scripts de geração de código
│   ├── services/             # Serviços e API
│   ├── styles/               # Estilos adicionais
│   ├── types/                # Tipos e interfaces
│   └── utils/                # Funções utilitárias
├── public/                   # Arquivos estáticos
├── tailwind.config.js        # Configuração do Tailwind
├── tsconfig.json             # Configuração do TypeScript
├── package.json              # Dependências e scripts
└── README.md                 # Documentação
```

## Funcionalidades

### Autenticação
- Login com nome de usuário e senha
- Proteção de rotas para usuários autenticados
- Gerenciamento de sessão

### Gerenciamento de Restaurantes
- Visualização de informações do restaurante
- Edição de detalhes do restaurante
- Configurações visuais personalizadas

### Gerenciamento de Menus
- Criação e edição de menus
- Organização de itens em categorias
- Controle de disponibilidade e preços

### Gerenciamento de Pedidos
- Visualização de pedidos em tempo real
- Atualização de status de pedidos
- Histórico de pedidos

## API

O dashboard consome uma API REST externa disponível em:
```
http://192.168.0.127:3001
```

A documentação da API está disponível em:
```
http://192.168.0.127:3001/api-json
```

Você também pode visualizar a documentação Swagger diretamente no dashboard em:
```
http://localhost:3000/api-docs
```

## Desenvolvimento

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run generate-api` - Gera código TypeScript a partir da documentação Swagger

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato através de [seu-email@exemplo.com].
# restaurant-dashboard
