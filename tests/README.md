# Testes - Tenant Manager

Este diretório contém os testes do módulo Tenant Manager.

## Estrutura

- `integration/` - Testes de integração da API REST
- `unit/` - Testes unitários por camada
  - `application/use-cases/` - Testes dos casos de uso
  - `domain/entities/` - Testes das entidades de domínio

## Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Nota sobre Testes de Integração

Os testes de integração usam o `InMemoryTenantRepository`, que mantém estado em memória durante a execução dos testes. Como o app é criado uma vez e o módulo é registrado uma vez, os dados persistem entre testes. Isso é diferente do padrão usado no intent-manager que usa SQLite e limpa o banco antes de cada teste.

