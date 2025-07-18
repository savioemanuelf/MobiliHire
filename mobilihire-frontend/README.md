# MobiliHire Frontend

Este é o frontend da aplicação MobiliHire, um sistema de mobilidade interna que permite às empresas gerenciar oportunidades de crescimento profissional para seus colaboradores.

## Sobre o MobiliHire

O MobiliHire é uma plataforma que facilita a mobilidade interna nas empresas através de:

- **Criação de Oportunidades Internas**: Empresas podem criar oportunidades de mobilidade entre departamentos
- **Análise de Compatibilidade**: Sistema de IA que avalia a compatibilidade de colaboradores com oportunidades
- **Gestão de Perfis**: Controle de dados da empresa e colaboradores
- **Dashboard Intuitivo**: Interface moderna para acompanhamento de métricas

## Principais Funcionalidades

### 1. Autenticação
- Login de empresas
- Cadastro de novas empresas
- Gerenciamento de sessão

### 2. Dashboard
- Visão geral das oportunidades ativas
- Estatísticas de mobilidade interna
- Acesso rápido às principais funcionalidades

### 3. Oportunidades Internas
- Listagem de todas as oportunidades
- Criação de novas oportunidades
- Configuração de requisitos e pesos
- Análise de compatibilidade

### 4. Perfil da Empresa
- Edição de dados da empresa
- Configurações de conta
- Exclusão de conta

## Estrutura do Projeto

```
mobilihire-frontend/
├── app/                          # Páginas da aplicação
│   ├── auth/                     # Autenticação
│   │   ├── login/               # Página de login
│   │   └── cadastrar/           # Página de cadastro
│   ├── dashboard/               # Dashboard principal
│   ├── oportunidades/           # Gerenciamento de oportunidades
│   │   └── nova/               # Criação de oportunidades
│   └── empresa/                # Perfil da empresa
├── components/                  # Componentes reutilizáveis
├── api/                        # APIs e interfaces
│   └── mobilihire.api.ts       # API principal do MobiliHire
└── lib/                        # Utilitários
```

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **shadcn/ui**: Componentes UI
- **Lucide React**: Ícones

## Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure a variável de ambiente:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Execute o projeto:
```bash
npm run dev
```

## Endpoints da API

O frontend se comunica com os seguintes endpoints do backend:

### Autenticação
- `POST /auth/login` - Login de empresa
- `POST /auth/cadastrar` - Cadastro de empresa

### Empresa
- `GET /empresas/me` - Buscar dados da empresa
- `PATCH /empresas` - Atualizar dados da empresa
- `DELETE /empresas` - Excluir conta

### Oportunidades Internas
- `GET /oportunidades-internas` - Listar oportunidades
- `GET /oportunidades-internas/{id}` - Buscar oportunidade específica
- `POST /oportunidades-internas` - Criar oportunidade
- `DELETE /oportunidades-internas/{id}` - Excluir oportunidade
- `POST /oportunidades-internas/{id}/compatibilidade` - Analisar compatibilidade
- `POST /oportunidades-internas/{oportunidadeId}/colaboradores/{colaboradorId}/avaliar` - Avaliar colaborador

### Currículos
- `POST /curriculos/analisar-curriculos/{idOportunidade}` - Analisar currículos

## Principais Adaptações do MobiliHire

Este frontend foi adaptado a partir do MobiliHire, com as seguintes mudanças principais:

1. **Contexto**: Mudança de recrutamento externo para mobilidade interna
2. **Entidades**: Vagas → Oportunidades Internas, Candidatos → Colaboradores
3. **Funcionalidades**: Foco em análise de compatibilidade interna
4. **Interface**: Adaptação de textos e labels para o contexto de mobilidade
5. **API**: Nova API específica para o MobiliHire

## Desenvolvimento

### Estrutura de Dados

#### OportunidadeInterna
```typescript
interface OportunidadeInterna {
  id: string;
  nome: string;
  isActive: boolean;
  empresaNome: string;
  tipoMobilidade: string;
  departamentoOrigem: string;
  departamentoDestino: string;
  nivelOrigem: string;
  nivelDestino: string;
  prazoCandidatura: number;
  requerAprovacaoGestor: boolean;
  requisitos: OportunidadeRequisitos;
}
```

#### Empresa
```typescript
interface Empresa {
  id: string;
  nome: string;
  email: string;
  cnpj?: string;
  telefone?: string;
  endereco?: string;
}
```

### Componentes Principais

- **Dashboard**: Visão geral com estatísticas
- **OportunidadesPage**: Listagem e gerenciamento de oportunidades
- **NovaOportunidadePage**: Formulário de criação de oportunidades
- **EmpresaPage**: Gerenciamento de perfil da empresa
- **LoginPage/CadastrarPage**: Autenticação

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste localmente
5. Faça um pull request

## Licença

Este projeto está sob a licença MIT. 