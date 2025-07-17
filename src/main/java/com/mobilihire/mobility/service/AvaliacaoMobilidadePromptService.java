package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.model.Colaborador;
import com.mobilihire.mobility.domain.model.OportunidadeInterna;
import com.mobilihire.mobility.domain.repository.ColaboradorRepositoryJpa;
import com.mobilihire.mobility.domain.repository.OportunidadeInternaRepositoryJpa;
import com.smarthirepro.core.service.IAvaliacaoLlm;
import com.smarthirepro.domain.model.Curriculo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AvaliacaoMobilidadePromptService implements IAvaliacaoLlm {
    @Autowired
    private OportunidadeInternaRepositoryJpa oportunidadeRepository;
    @Autowired
    private ColaboradorRepositoryJpa colaboradorRepository;

    @Override
    public String avaliacaoPrompt(UUID oportunidadeId, UUID colaboradorId) {
        OportunidadeInterna oportunidade = oportunidadeRepository.findById(oportunidadeId)
                .orElseThrow(() -> new IllegalArgumentException("Oportunidade não encontrada com o ID: " + oportunidadeId));

        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new IllegalArgumentException("Colaborador não encontrado com o ID: " + colaboradorId));

        Curriculo curriculo = colaborador.getCurriculo();
        if (curriculo == null) {
            throw new IllegalStateException("Colaborador não possui currículo para análise detalhada.");
        }

        StringBuilder requisitosOportunidade = new StringBuilder();
        requisitosOportunidade.append("Habilidades Requeridas: ").append(oportunidade.getRequisitos().getHabilidades()).append("\n")
                .append("Experiência Necessária: ").append(oportunidade.getRequisitos().getExperiencia()).append("\n")
                .append("Formação Desejada: ").append(oportunidade.getRequisitos().getFormacaoAcademica()).append("\n");

        StringBuilder dadosColaborador = new StringBuilder();
        dadosColaborador.append("Cargo Atual: ").append(colaborador.getCargoAtual()).append("\n")
                .append("Departamento Atual: ").append(colaborador.getDepartamentoAtual()).append("\n")
                .append("Avaliação de Desempenho Recente: ").append(colaborador.getAvaliacaoDesempenho()).append("\n")
                .append("Experiência (do Currículo): ").append(curriculo.getExperiencia()).append("\n")
                .append("Habilidades (do Currículo): ").append(String.join(", ", curriculo.getHabilidades())).append("\n");

        return String.format(
                """
                Você é um especialista em RH e desenvolvimento de carreira, com a tarefa de analisar a adequação de um colaborador para uma oportunidade de mobilidade interna, focando em crescimento e desenvolvimento.
    
                **Contexto da Análise:**
                - O colaborador **%s** está a ser avaliado para a oportunidade interna de **%s**.
    
                **Requisitos da Nova Oportunidade:**
                %s
    
                **Perfil Atual e Histórico do Colaborador:**
                %s
    
                **Instruções de Saída OBRIGATÓRIAS:**
                Responda EXCLUSIVAMENTE com um objeto JSON válido, sem nenhum texto ou formatação adicional. O objeto JSON deve conter os seguintes campos:
                1. "adequacaoMobilidade": (String) Uma avaliação da prontidão do colaborador para a nova função. Use termos como "Pronto para Transição", "Alto Potencial com Desenvolvimento", "Requer Desenvolvimento Estruturado" ou "Movimentação Não Recomendada no Momento".
                2. "pontosFortesParaMobilidade": (Array de Strings) Uma lista dos pontos fortes e experiências que o colaborador já possui e que são diretamente aplicáveis e benéficos na nova função.
                3. "gapsDesenvolvimento": (Array de Strings) Uma lista das competências, conhecimentos ou experiências que o colaborador precisa de adquirir ou aprofundar para ter sucesso na nova função. Seja específico.
                4. "planoAcaoRecomendado": (String) Uma sugestão clara e acionável para um Plano de Desenvolvimento Individual (PDI), focada em como colmatar os "gaps" identificados e preparar o colaborador para a transição.
    
                **Exemplo de formato JSON esperado:**
                {
                  "adequacaoMobilidade": "Alto Potencial com Desenvolvimento",
                  "pontosFortesParaMobilidade": [
                    "A sólida experiência como Desenvolvedor Backend I fornece uma base técnica excelente.",
                    "A avaliação de desempenho de 4.2 indica um profissional bem-sucedido na sua função atual."
                  ],
                  "gapsDesenvolvimento": [
                    "Necessita desenvolver competências em arquitetura de microsserviços, um requisito chave para a posição Sênior.",
                    "A experiência com liderança técnica ou mentoria de outros desenvolvedores não é evidente."
                  ],
                  "planoAcaoRecomendado": "Para o colaborador: Recomenda-se um curso focado em design de sistemas distribuídos e a participação como líder técnico num projeto de menor escopo. Para a empresa: Envolvê-lo em discussões de arquitetura e design para acelerar o seu desenvolvimento."
                }
    
                Analise cuidadosamente todas as informações e gere o objeto JSON conforme especificado.
                """,
                colaborador.getNome(), oportunidade.getNome(), requisitosOportunidade, dadosColaborador
        );
    }
}