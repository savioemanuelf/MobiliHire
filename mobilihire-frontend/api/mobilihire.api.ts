// Interfaces baseadas nos DTOs do backend
export interface OportunidadeInterna {
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

export interface OportunidadeRequisitos {
  habilidades: string;
  idiomas?: string;
  formacaoAcademica: string;
  experiencia?: string;
  pesoHabilidades: number;
  pesoIdiomas: number;
  pesoFormacaoAcademica: number;
  pesoExperiencia: number;
  pontuacaoMinima: number;
}

export interface OportunidadeInternaCreate {
  nome: string;
  empresaId?: string;
  isActive: boolean;
  habilidades: string;
  idiomas?: string;
  formacaoAcademica: string;
  experiencia?: string;
  pesoHabilidades: number;
  pesoIdiomas: number;
  pesoFormacaoAcademica: number;
  pesoExperiencia: number;
  pontuacaoMinima: number;
  tipoMobilidade: string;
  departamentoOrigem: string;
  departamentoDestino: string;
  nivelOrigem: string;
  nivelDestino: string;
  prazoCandidatura: number;
  requerAprovacaoGestor: boolean;
}

export interface Empresa {
  id: string;
  nome: string;
  email: string;
  cnpj?: string;
  telefone?: string;
  endereco?: string;
}

export interface EmpresaUpdate {
  nome?: string;
  email?: string;
  cnpj?: string;
  telefone?: string;
  endereco?: string;
}

export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  departamento: string;
  nivel: string;
  curriculoId?: string;
}

export interface MobilidadeAvaliacao {
  colaboradorId: string;
  oportunidadeId: string;
  pontuacao: number;
  compatibilidade: string;
  pontosFortes: string;
  lacunasIdentificadas: string;
  sugestoesParaEmpresa: string;
  recomendacao: string;
}

export interface AuthRequest {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
}

// Interface para relatório de mobilidade interna
export interface RelatorioMobilidade {
  adequacaoMobilidade: string;
  pontosFortesParaMobilidade: string[];
  gapsDesenvolvimento: string[];
  planoAcaoRecomendado: string;
}

// Funções de API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const mobilihireApi = {
  // Auth
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || 'Credenciais inválidas';
      throw new Error(errorMessage);
    }
    
    return response.json();
  },

  async cadastrarEmpresa(empresa: Omit<Empresa, 'id'>): Promise<Empresa> {
    const response = await fetch(`${API_BASE_URL}/auth/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empresa),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar empresa');
    }
    
    return response.json();
  },

  // Empresa
  async getEmpresa(): Promise<Empresa> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/empresas/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da empresa');
    }
    
    return response.json();
  },

  async updateEmpresa(data: EmpresaUpdate): Promise<Empresa> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/empresas`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar empresa');
    }
    
    return response.json();
  },

  async deleteEmpresa(): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/empresas`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar empresa');
    }
  },

  // Colaboradores
  async getColaboradores(): Promise<Colaborador[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/colaboradores`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar colaboradores');
    }
    
    return response.json();
  },

  async getColaborador(id: string): Promise<Colaborador> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/colaboradores/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar colaborador');
    }
    
    return response.json();
  },

  async buscarColaboradores(nome: string): Promise<Colaborador[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/colaboradores/buscar?nome=${encodeURIComponent(nome)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar colaboradores');
    }
    
    return response.json();
  },

  // Oportunidades Internas
  async getOportunidades(): Promise<OportunidadeInterna[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar oportunidades');
    }
    
    return response.json();
  },

  async getOportunidade(id: string): Promise<OportunidadeInterna> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar oportunidade');
    }
    
    return response.json();
  },

  async createOportunidade(data: OportunidadeInternaCreate): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar oportunidade');
    }
  },

  async deleteOportunidade(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar oportunidade');
    }
  },

  async analisarCompatibilidade(id: string): Promise<string> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas/${id}/compatibilidade`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao analisar compatibilidade');
    }
    
    return response.text();
  },

  async avaliarColaborador(oportunidadeId: string, colaboradorId: string): Promise<MobilidadeAvaliacao> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas/${oportunidadeId}/colaboradores/${colaboradorId}/avaliar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao avaliar colaborador');
    }
    
    return response.json();
  },

  async gerarRelatorioColaborador(oportunidadeId: string, colaboradorId: string): Promise<RelatorioMobilidade> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/oportunidades-internas/${oportunidadeId}/colaboradores/${colaboradorId}/avaliar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao gerar relatório de colaborador');
    }
    
    return response.json();
  },

  // Currículos
  async analisarCurriculos(oportunidadeId: string, file: File): Promise<any[]> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/curriculos/analisar-curriculos/${oportunidadeId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Erro ao analisar currículos');
    }
    
    return response.json();
  },
}; 