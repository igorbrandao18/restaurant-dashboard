# Guia de Pair Programming com IA

## Características do Assistente

1. **Abordagem Sistemática**
   - Segue uma ordem lógica de implementação
   - Mantém um registro claro do progresso (PROGRESS.md)
   - Divide tarefas complexas em etapas menores e gerenciáveis
   - Implementa um módulo por vez, garantindo sua completude
   - Valida cada etapa antes de prosseguir

2. **Comunicação Clara**
   - Explica o que está fazendo antes de cada ação
   - Fornece feedback após cada etapa
   - Mantém o usuário informado sobre o progresso
   - Usa exemplos práticos para explicar conceitos
   - Sugere melhorias e boas práticas proativamente

3. **Boas Práticas**
   - Implementa testes automatizados (unitários, integração)
   - Segue padrões de código consistentes
   - Documenta o código adequadamente
   - Trata erros apropriadamente
   - Implementa validações de entrada
   - Segue princípios SOLID e Clean Code
   - Utiliza TypeScript para type safety
   - Implementa documentação OpenAPI/Swagger

## Como Interagir

1. **Início do Projeto**
   ```plaintext
   "Preciso implementar [descrição do projeto]. Poderia me ajudar seguindo sua abordagem sistemática?"
   "Vamos começar um novo projeto de [tipo do projeto]. Como você sugere estruturá-lo?"
   ```

2. **Durante o Desenvolvimento**
   ```plaintext
   "Continue" - Para prosseguir com a próxima etapa lógica
   "Explique [parte específica]" - Para entender melhor alguma implementação
   "Revise [arquivo/função]" - Para revisar código existente
   "Poderia documentar [módulo/função]?" - Para adicionar documentação
   "Como podemos melhorar [parte do código]?" - Para sugestões de refatoração
   ```

3. **Solicitando Testes**
   ```plaintext
   "Vamos adicionar testes para [módulo/função]"
   "Poderia testar [cenário específico]"
   "Como podemos aumentar a cobertura de testes?"
   "Que casos de teste estamos esquecendo?"
   ```

4. **Debugging**
   ```plaintext
   "Estou tendo um problema com [descrição]. Poderia me ajudar a debugar?"
   "Por que este erro está acontecendo: [mensagem de erro]"
   "Como podemos prevenir este tipo de erro?"
   ```

5. **Documentação e Swagger**
   ```plaintext
   "Vamos documentar a API com Swagger"
   "Precisamos melhorar a documentação do [módulo]"
   "Como podemos tornar a documentação mais clara?"
   ```

## Melhores Práticas

1. **Forneça Contexto**
   - Compartilhe arquivos relevantes
   - Descreva o ambiente de desenvolvimento
   - Explique requisitos específicos
   - Mencione restrições técnicas
   - Indique preferências de arquitetura

2. **Acompanhe o Progresso**
   - Mantenha um arquivo PROGRESS.md atualizado
   - Revise as mudanças após cada etapa
   - Confirme se os testes estão passando
   - Monitore a cobertura de código
   - Verifique a qualidade do código

3. **Iteração**
   - Faça pequenas mudanças de cada vez
   - Teste frequentemente
   - Commit após cada funcionalidade completa
   - Revise o código antes do commit
   - Mantenha mensagens de commit descritivas

4. **Documentação**
   - Mantenha READMEs atualizados
   - Documente decisões importantes
   - Comente código complexo
   - Use JSDoc/TSDoc para documentação inline
   - Mantenha a documentação da API atualizada

## Fluxo de Trabalho Recomendado

1. **Planejamento**
   - Definir estrutura do projeto
   - Criar lista de tarefas
   - Estabelecer prioridades
   - Identificar dependências
   - Escolher tecnologias apropriadas

2. **Implementação**
   - Desenvolver um módulo por vez
   - Escrever testes primeiro (TDD)
   - Refatorar quando necessário
   - Validar entradas
   - Tratar erros adequadamente

3. **Revisão**
   - Verificar cobertura de testes
   - Validar funcionalidades
   - Identificar melhorias
   - Revisar segurança
   - Otimizar performance

4. **Documentação**
   - Atualizar documentação
   - Registrar decisões técnicas
   - Documentar APIs
   - Criar exemplos de uso
   - Documentar configurações

## Estrutura de Projeto Recomendada

```plaintext
projeto/
├── src/
│   ├── modules/           # Módulos da aplicação
│   │   ├── users/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── tests/
│   ├── common/           # Código compartilhado
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── decorators/
│   │   └── interfaces/
│   ├── config/          # Configurações
│   └── main.ts
├── test/               # Testes E2E
├── docs/              # Documentação
├── prisma/           # Schema e migrações
└── README.md
```

## Comandos Úteis

```bash
# Iniciar novo módulo
"Vamos implementar o módulo [nome]"

# Adicionar testes
"Precisamos adicionar testes para [funcionalidade]"

# Revisar código
"Pode revisar esta implementação?"

# Debugar
"Estou tendo este erro: [erro]. Pode ajudar?"

# Documentação
"Vamos documentar a API do módulo [nome]"
```

## Dicas Avançadas

1. **Gerenciamento de Estado**
   - Mantenha o estado previsível
   - Use imutabilidade quando possível
   - Centralize a lógica de negócios

2. **Performance**
   - Otimize consultas ao banco
   - Use caching quando apropriado
   - Implemente paginação
   - Monitore memory leaks

3. **Segurança**
   - Valide todas as entradas
   - Use HTTPS
   - Implemente rate limiting
   - Siga as melhores práticas OWASP

4. **Escalabilidade**
   - Design para horizontalidade
   - Use filas para tarefas pesadas
   - Implemente caching distribuído
   - Monitore performance

## Exemplo de Fluxo de Conversa

```plaintext
Usuário: "Preciso implementar um novo módulo de autenticação"
IA: [Propõe estrutura e passos]
Usuário: "Continue"
IA: [Implementa primeira parte]
Usuário: "Explique esta parte específica"
IA: [Fornece explicação detalhada]
Usuário: "Vamos adicionar testes"
IA: [Implementa testes unitários]
```

## Checklist de Qualidade

- [ ] Testes unitários implementados
- [ ] Testes de integração implementados
- [ ] Documentação atualizada
- [ ] Swagger/OpenAPI configurado
- [ ] Validações implementadas
- [ ] Tratamento de erros adequado
- [ ] Logging configurado
- [ ] Segurança implementada
- [ ] Performance otimizada
- [ ] Código limpo e legível

---

Este guia serve como referência para manter uma comunicação efetiva e produtiva durante o desenvolvimento. Adapte conforme necessário para seu projeto específico. 