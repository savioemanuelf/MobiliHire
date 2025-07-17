package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.model.Colaborador;
import com.smarthirepro.domain.model.Curriculo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MobiliHirePromptService {
    public List<String> generateMobilityPrompts(List<Colaborador> colaboradores, List<String> criteriosOportunidade) {
        List<String> prompts = new ArrayList<>();
        String criteriosTexto = String.join("\n", criteriosOportunidade);

        for (Colaborador colaborador : colaboradores) {
            Curriculo curriculo = colaborador.getCurriculo();
            if (curriculo == null) {
                continue;
            }

            String nome = colaborador.getNome();
            String cargoAtual = colaborador.getCargoAtual();
            String departamentoAtual = colaborador.getDepartamentoAtual();
            String experiencia = curriculo.getExperiencia() != null ? curriculo.getExperiencia() : "";
            String formacaoTexto = String.join(", ", curriculo.getFormacaoAcademica());
            String habilidadesTexto = String.join(", ", curriculo.getHabilidades());
            String idiomasTexto = String.join(", ", curriculo.getIdiomas());

            String prompt = String.format(
                    "Você é um especialista em RH avaliando a adequação de um colaborador interno para uma nova oportunidade na mesma empresa.\n\n" +
                            "**Contexto da Análise:**\n" +
                            "- O colaborador **%s** atualmente ocupa o cargo de **%s** no departamento de **%s**.\n" +
                            "- Ele está sendo considerado para uma oportunidade de mobilidade interna.\n\n" +
                            "**Requisitos da Nova Oportunidade:**\n%s\n\n" +
                            "**Perfil do Colaborador:**\n" +
                            "- Experiência: %s\n" +
                            "- Formação Acadêmica: %s\n" +
                            "- Habilidades Técnicas: %s\n" +
                            "- Idiomas: %s\n\n" +
                            "**Sua Tarefa:**\n" +
                            "Com base na comparação entre o perfil atual do colaborador e os requisitos da nova oportunidade, avalie o 'fit' para esta mobilidade. " +
                            "Atribua uma pontuação de compatibilidade entre 0.0 e 1.0, considerando os pesos dos critérios. " +
                            "Responda apenas com o nome e o número, no formato: 'nome: pontuação'. Exemplo: 'Ana Silva: 0.85'",
                    nome, cargoAtual, departamentoAtual, criteriosTexto, experiencia, formacaoTexto, habilidadesTexto, idiomasTexto
            );

            prompts.add(prompt);
        }
        return prompts;
    }
}