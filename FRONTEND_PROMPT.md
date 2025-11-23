# Criação de Interface React para Tenant Manager - Gerenciamento de Tenants

## Contexto

Preciso criar uma interface completa em React (TypeScript) para gerenciar tenants do Tenant Manager. Esta é uma aplicação frontend nova que precisa ser criada do zero para interagir com a API REST do microserviço de tenants.

## API Base URL

A API está rodando em: `http://localhost:3002/api` (ou configurável via variável de ambiente `VITE_API_URL` ou `REACT_APP_API_URL`)

## Estrutura de Resposta Padrão da API

Todas as respostas seguem este formato:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
```

## Endpoints Disponíveis

### 1. Criar Tenant

**POST `/api/tenants`**

Cria um novo tenant.

**Body:**
```typescript
{
  name: string;  // Obrigatório
}
```

**Resposta (201):**
```typescript
{
  success: true,
  data: {
    id: string;      // UUID gerado automaticamente
    name: string;
  }
}
```

**Erros possíveis:**
- `400`: Campo name faltando ou não é string
- `500`: Erro interno do servidor

### 2. Buscar Tenant por ID

**GET `/api/tenants/:id`**

Busca um tenant específico pelo ID.

**Resposta (200):**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
  }
}
```

**Erros possíveis:**
- `400`: ID não fornecido
- `404`: Tenant não encontrado

### 3. Atualizar Tenant

**PUT `/api/tenants/:id`**

Atualiza um tenant existente.

**Body:**
```typescript
{
  name: string;  // Obrigatório
}
```

**Resposta (200):**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
  }
}
```

**Erros possíveis:**
- `400`: Campo name faltando, não é string, ou ID não fornecido
- `404`: Tenant não encontrado

### 4. Excluir Tenant

**DELETE `/api/tenants/:id`**

Exclui um tenant (delete físico - remove do repositório).

**Resposta (200):**
```typescript
{
  success: true,
  data: {
    message: "Tenant deleted successfully"
  }
}
```

**Erros possíveis:**
- `400`: ID não fornecido
- `404`: Tenant não encontrado

### 5. Listar Todos os Tenants

**GET `/api/tenants`**

Lista todos os tenants cadastrados.

**Resposta (200):**
```typescript
{
  success: true,
  data: [
    {
      id: string;
      name: string;
    },
    // ... mais tenants
  ]
}
```

**Nota:** Retorna um array direto, não um objeto com `items` e `total`.

## Tipos TypeScript Necessários

```typescript
// Tenant Types
interface Tenant {
  id: string;
  name: string;
}

// Request Types
interface CreateTenantRequest {
  name: string;
}

interface UpdateTenantRequest {
  name: string;
}

// API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}
```

## Funcionalidades Requeridas

### 1. Listagem de Tenants

**Funcionalidades:**
- Tabela/listagem mostrando todos os tenants
- Colunas na tabela:
  - ID (pode ser truncado com tooltip ou mostrar completo)
  - Name
  - Actions (View/Edit/Delete)
- Busca:
  - Input de busca para filtrar por nome
  - Busca em tempo real ou com botão "Buscar"
- Ordenação:
  - Por nome (A-Z / Z-A)
  - Por ID (opcional)
- Estado vazio:
  - Mensagem quando não há tenants cadastrados
  - Botão para criar o primeiro tenant

### 2. Criação de Tenant

**Formulário com campos:**
- `name` (text input, obrigatório)
  - Validação: não pode estar vazio
  - Validação: mínimo de caracteres (opcional, ex: 2 caracteres)
  - Validação: máximo de caracteres (opcional, ex: 100 caracteres)

**Validações:**
- Campo name obrigatório e não vazio
- Feedback visual de validação em tempo real

**Comportamento:**
- Loading state durante criação
- Mensagem de sucesso após criação
- Redirecionar para lista ou atualizar lista automaticamente
- Fechar modal/formulário após criação bem-sucedida

### 3. Edição de Tenant

**Formulário pré-preenchido:**
- Campo `name` pré-preenchido com valor atual
- Validações iguais à criação

**Comportamento:**
- Carregar dados do tenant ao abrir formulário
- Mostrar loading durante carregamento
- Permitir atualizar o nome
- Loading state durante atualização
- Mensagem de sucesso
- Atualizar lista após edição

### 4. Visualização de Detalhes

**Modal ou página de detalhes:**
- Mostrar ID do tenant
- Mostrar nome do tenant
- Botões de ação:
  - Editar
  - Excluir
  - Voltar para lista

**Informações exibidas:**
- ID completo (com opção de copiar)
- Nome do tenant

### 5. Exclusão de Tenant

**Confirmação obrigatória:**
- Modal de confirmação antes de excluir
- Mostrar informações do tenant que será excluído
- Aviso: "Esta ação não pode ser desfeita" (delete físico)
- Botões: "Cancelar" e "Excluir"

**Comportamento:**
- Loading state durante exclusão
- Mensagem de sucesso
- Atualizar lista após exclusão
- Tratamento de erro 404

### 6. Busca e Filtros

**Funcionalidades:**
- Input de busca para filtrar por nome
- Busca em tempo real (debounce recomendado)
- Mostrar contador de resultados
- Botão "Limpar busca"

## Requisitos de UI/UX

### 1. Design Moderno e Responsivo
- Use um design system moderno (Material-UI, Ant Design, Chakra UI, Tailwind CSS, ou similar)
- Layout responsivo para mobile e desktop
- Cores e tipografia consistentes
- Tema claro/escuro (opcional mas desejável)

### 2. Feedback Visual
- Loading states em todas as operações assíncronas
- Skeleton loaders para listagem
- Mensagens de sucesso/erro claras
- Toasts/notifications para feedback de ações
- Confirmações visuais para ações destrutivas

### 3. Validação de Formulários
- Validação em tempo real
- Mensagens de erro claras e específicas
- Campos obrigatórios marcados com asterisco (*)
- Highlight de campos com erro
- Desabilitar botão de submit enquanto validação falhar

### 4. Tabela/Listagem
- Design limpo e organizado
- Hover states nas linhas
- Ações rápidas (ícones de ação)
- Paginação se necessário (para muitos tenants)
- Ordenação clicável nas colunas
- Responsiva: em mobile, pode virar cards

### 5. Modais
- Modais para criação/edição
- Modal de confirmação para exclusão
- Modal de detalhes (opcional)
- Fechar com ESC ou clique fora
- Foco automático no primeiro campo
- Prevenir fechamento acidental durante operações

### 6. Gerenciamento de Estado
- Use Context API, Redux, Zustand, ou React Query para gerenciar estado
- Cache de tenants para evitar chamadas desnecessárias
- Estado de loading/error para cada operação
- Otimistic updates (opcional - atualizar UI antes da confirmação do servidor)

## Estrutura de Componentes Sugerida

```
src/
├── components/
│   ├── tenants/
│   │   ├── TenantList.tsx          // Listagem principal
│   │   ├── TenantTable.tsx         // Tabela de tenants
│   │   ├── TenantCard.tsx          // Card para visualização alternativa (mobile)
│   │   ├── TenantForm.tsx          // Formulário de criação/edição
│   │   ├── TenantDetail.tsx        // Modal/página de detalhes
│   │   ├── TenantSearch.tsx        // Componente de busca
│   │   └── DeleteConfirmModal.tsx  // Modal de confirmação
│   ├── shared/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── SuccessMessage.tsx
│   │   ├── EmptyState.tsx          // Estado vazio da lista
│   │   ├── SearchInput.tsx
│   │   └── Modal.tsx               // Modal reutilizável
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx             // Opcional
│   │   └── Layout.tsx
├── services/
│   ├── api.ts              // Configuração axios/fetch
│   └── tenants.ts          // Funções de API para tenants
├── hooks/
│   ├── useTenants.ts       // Hook para listar tenants
│   ├── useTenant.ts        // Hook para buscar um tenant
│   ├── useCreateTenant.ts  // Hook para criar
│   ├── useUpdateTenant.ts  // Hook para atualizar
│   ├── useDeleteTenant.ts  // Hook para excluir
│   └── useTenantSearch.ts // Hook para busca
├── types/
│   └── tenants.ts          // Todos os tipos TypeScript
├── utils/
│   ├── formatters.ts       // Formatação de IDs, etc
│   └── validators.ts       // Validações de formulário
└── pages/
    ├── TenantsPage.tsx     // Página principal
    └── TenantDetailPage.tsx // Página de detalhes (opcional)
```

## Validações Importantes

### Criação e Atualização
1. **name**: 
   - Não pode estar vazio
   - Recomendado: mínimo 2 caracteres
   - Recomendado: máximo 100 caracteres
   - Trim de espaços em branco no início/fim

### Listagem
1. Validação de busca antes de fazer requisição (opcional - pode filtrar no frontend)

## Tratamento de Erros

### Códigos de Erro Comuns

- **400 Bad Request**: Validação de campos
  - Exibir mensagem de erro específica
  - Destacar campos com erro no formulário
  - Exemplo: "Name is required and must be a string"

- **404 Not Found**: Tenant não encontrado
  - Mensagem: "Tenant não encontrado"
  - Botão para voltar à lista
  - Pode ocorrer ao tentar editar/excluir um tenant que foi removido

- **500 Internal Server Error**: Erro do servidor
  - Mensagem genérica de erro
  - Opção de tentar novamente
  - Log do erro para debug (em desenvolvimento)

### Mensagens de Erro Amigáveis

```typescript
const getErrorMessage = (error: ApiResponse['error']): string => {
  if (!error) return 'Ocorreu um erro desconhecido';
  
  switch (error.code) {
    case 'BAD_REQUEST':
      return error.message || 'Dados inválidos. Verifique os campos preenchidos.';
    case 'NOT_FOUND':
      return 'Tenant não encontrado.';
    case 'ROUTE_NOT_FOUND':
      return 'Rota não encontrada.';
    case 'INTERNAL_ERROR':
      return 'Erro interno do servidor. Tente novamente mais tarde.';
    default:
      return error.message || 'Ocorreu um erro ao processar sua solicitação.';
  }
};
```

## Regras de Negócio Importantes

1. **ID Único**: Cada tenant recebe um UUID único gerado automaticamente
   - Não é editável pelo usuário
   - Pode ser copiado para uso em outras partes do sistema

2. **Nome**: 
   - Deve ser único (validação no backend)
   - Pode ser alterado a qualquer momento
   - Não há restrições especiais além de ser string não vazia

3. **Delete Físico**: Exclusão remove permanentemente
   - Aviso claro na confirmação
   - Não há como recuperar após exclusão
   - Considerar confirmação dupla para ações críticas

4. **Busca**: 
   - Busca por nome (case-insensitive recomendado)
   - Pode ser implementada no frontend (filtro local) ou backend (futuro)

## Funcionalidades Extras (Opcionais mas Desejáveis)

1. **Export/Import**: Exportar tenants como JSON e importar
2. **Duplicar Tenant**: Criar cópia de tenant existente (com nome modificado)
3. **Bulk Actions**: Selecionar múltiplos tenants para exclusão em massa
4. **Copiar ID**: Botão para copiar ID do tenant para clipboard
5. **Estatísticas**: Dashboard com contador total de tenants
6. **Validação em Tempo Real**: Verificar disponibilidade de nome enquanto digita (se implementado no backend)
7. **Histórico**: Mostrar quando foi criado/atualizado (se adicionado no futuro)
8. **Filtros Avançados**: Filtros por múltiplos critérios (quando mais campos forem adicionados)

## Exemplos de Uso

### Criar Tenant
```typescript
const createTenant = async (data: CreateTenantRequest) => {
  const response = await fetch(`${API_URL}/api/tenants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result: ApiResponse<Tenant> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Erro ao criar tenant');
  }
  
  return result.data;
};
```

### Listar Todos os Tenants
```typescript
const listTenants = async () => {
  const response = await fetch(`${API_URL}/api/tenants`);
  const result: ApiResponse<Tenant[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Erro ao listar tenants');
  }
  
  return result.data || [];
};
```

### Buscar Tenant por ID
```typescript
const getTenant = async (id: string) => {
  const response = await fetch(`${API_URL}/api/tenants/${id}`);
  const result: ApiResponse<Tenant> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Erro ao buscar tenant');
  }
  
  return result.data;
};
```

### Atualizar Tenant
```typescript
const updateTenant = async (id: string, data: UpdateTenantRequest) => {
  const response = await fetch(`${API_URL}/api/tenants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result: ApiResponse<Tenant> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Erro ao atualizar tenant');
  }
  
  return result.data;
};
```

### Excluir Tenant
```typescript
const deleteTenant = async (id: string) => {
  const response = await fetch(`${API_URL}/api/tenants/${id}`, {
    method: 'DELETE'
  });
  
  const result: ApiResponse<{ message: string }> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Erro ao excluir tenant');
  }
  
  return result.data;
};
```

## Exemplo de Hook Customizado (React Query)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listTenants, getTenant, createTenant, updateTenant, deleteTenant } from '../services/tenants';

// Listar tenants
export const useTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: listTenants,
  });
};

// Buscar tenant por ID
export const useTenant = (id: string) => {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: () => getTenant(id),
    enabled: !!id,
  });
};

// Criar tenant
export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};

// Atualizar tenant
export const useUpdateTenant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantRequest }) => 
      updateTenant(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      queryClient.invalidateQueries({ queryKey: ['tenant', variables.id] });
    },
  });
};

// Excluir tenant
export const useDeleteTenant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};
```

## Observações Importantes

1. **API Response Format**: Todas as respostas seguem o formato `ApiResponse<T>` com `success`, `data`, `error` e `meta`
2. **Status Codes**: A API retorna códigos HTTP apropriados (200, 201, 400, 404, 500)
3. **Array Direto**: A listagem retorna um array direto em `data`, não um objeto com `items` e `total`
4. **Validação**: A validação é feita tanto no frontend quanto no backend
5. **Error Handling**: Sempre verificar `success` antes de acessar `data`
6. **Loading States**: Sempre mostrar loading durante requisições assíncronas
7. **Optimistic Updates**: Considerar atualização otimista para melhor UX (opcional)
8. **UUID**: Os IDs são UUIDs v4 gerados automaticamente pelo backend

## Checklist de Implementação

- [ ] Configurar projeto React com TypeScript
- [ ] Configurar roteamento (React Router)
- [ ] Configurar biblioteca de UI (Material-UI, Ant Design, etc)
- [ ] Criar tipos TypeScript baseados na API
- [ ] Criar serviço de API (axios/fetch wrapper)
- [ ] Criar hooks customizados para operações CRUD
- [ ] Implementar página de listagem com busca
- [ ] Implementar formulário de criação
- [ ] Implementar formulário de edição
- [ ] Implementar modal de detalhes
- [ ] Implementar modal de confirmação de exclusão
- [ ] Implementar tratamento de erros
- [ ] Implementar loading states
- [ ] Implementar validações de formulário
- [ ] Adicionar funcionalidade de copiar ID
- [ ] Testar todos os fluxos (criar, editar, excluir, listar)
- [ ] Adicionar responsividade mobile
- [ ] Adicionar testes (opcional mas recomendado)

## Estrutura Mínima de Página

```typescript
// Exemplo básico de página de listagem
import { useState } from 'react';
import { useTenants, useDeleteTenant } from '../hooks/useTenants';
import TenantTable from '../components/tenants/TenantTable';
import TenantForm from '../components/tenants/TenantForm';
import DeleteConfirmModal from '../components/tenants/DeleteConfirmModal';

const TenantsPage = () => {
  const { data: tenants, isLoading, error } = useTenants();
  const deleteTenant = useDeleteTenant();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [deletingTenant, setDeletingTenant] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTenants = tenants?.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Erro ao carregar tenants" />;

  return (
    <div>
      <header>
        <h1>Gerenciar Tenants</h1>
        <button onClick={() => setIsCreateModalOpen(true)}>
          Criar Tenant
        </button>
      </header>

      <TenantSearch 
        value={searchTerm} 
        onChange={setSearchTerm} 
      />

      <TenantTable
        tenants={filteredTenants}
        onEdit={setEditingTenant}
        onDelete={setDeletingTenant}
      />

      {isCreateModalOpen && (
        <TenantForm
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => setIsCreateModalOpen(false)}
        />
      )}

      {editingTenant && (
        <TenantForm
          tenant={editingTenant}
          onClose={() => setEditingTenant(null)}
          onSuccess={() => setEditingTenant(null)}
        />
      )}

      {deletingTenant && (
        <DeleteConfirmModal
          tenant={deletingTenant}
          onClose={() => setDeletingTenant(null)}
          onConfirm={() => {
            deleteTenant.mutate(deletingTenant.id);
            setDeletingTenant(null);
          }}
        />
      )}
    </div>
  );
};
```

---

Por favor, crie uma interface completa, moderna e funcional seguindo estes requisitos. Use TypeScript, componentes reutilizáveis, hooks customizados, e siga as melhores práticas do React. A interface deve ser intuitiva, responsiva e fornecer feedback claro ao usuário em todas as operações.

