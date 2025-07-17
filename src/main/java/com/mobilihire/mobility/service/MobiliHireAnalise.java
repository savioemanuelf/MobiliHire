package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.model.Colaborador;
import com.mobilihire.mobility.domain.model.OportunidadeInterna;
import com.mobilihire.mobility.domain.model.OportunidadeRequisitos;
import com.mobilihire.mobility.domain.repository.ColaboradorRepositoryJpa;
import com.mobilihire.mobility.domain.repository.OportunidadeInternaRepositoryJpa;
import com.mobilihire.mobility.domain.repository.OportunidadeRequisitosRepository;
import com.smarthirepro.core.exception.BusinessRuleException;
import com.smarthirepro.core.exception.FlaskConnectionException;
import com.smarthirepro.core.service.impl.AnaliseTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MobiliHireAnalise extends AnaliseTemplate<OportunidadeInterna> {

    @Autowired
    private OportunidadeInternaRepositoryJpa oportunidadeRepository;
    @Autowired
    private OportunidadeRequisitosRepository oportunidadeRequisitosRepository;
    @Autowired
    private ColaboradorRepositoryJpa colaboradorRepository;
    @Autowired
    private MobiliHirePromptService promptService;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    protected List<String> definirCriterios(UUID id) {
        OportunidadeRequisitos requisitos = oportunidadeRequisitosRepository.findByCargo_Id(id);
        OportunidadeInterna oportunidade = oportunidadeRepository.findById(requisitos.getCargo().getId()).orElse(null);

        List<String> criterios = new ArrayList<>();

        // --- CRITÉRIOS TÉCNICOS ---
        criterios.add("Habilidades Requeridas: " + requisitos.getHabilidades());
        criterios.add("Experiência Necessária: " + requisitos.getExperiencia());
        criterios.add("Formação Desejada: " + requisitos.getFormacaoAcademica());
        criterios.add("Idiomas: " + requisitos.getIdiomas());
        criterios.add("Peso Habilidades: " + requisitos.getPesoHabilidades());
        criterios.add("Peso Experiência: " + requisitos.getPesoExperiencia());
        criterios.add("Peso Formação: " + requisitos.getPesoFormacaoAcademica());
        criterios.add("Peso Idiomas: " + requisitos.getPesoIdiomas());

        // --- NOVOS CRITÉRIOS DO NEGÓCIO ---
        assert oportunidade != null;
        criterios.add("Tipo de Mobilidade: " + oportunidade.getTipoMobilidade());
        criterios.add("Departamento de Destino: " + oportunidade.getDepartamentoDestino());
        criterios.add("Nível de Destino: " + oportunidade.getNivelDestino());
        criterios.add("Pontuação Mínima Exigida: " + oportunidade.getPontuacaoMinima());

        // criterios.add("Avaliação de Desempenho Mínima: 4.0");

        return criterios;
    }

    @Override
    protected String executarAnalise(UUID id, List<String> criterios) {

        String flaskUrl = "http://localhost:5000/compare_resumes";
        List<Colaborador> colaboradores = colaboradorRepository.findAll();
        List<String> analiseRequest = promptService.generateMobilityPrompts(colaboradores, criterios);

        if (analiseRequest.isEmpty()) {
            return "Nenhum colaborador elegível encontrado para análise.";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<List<String>> requestEntity = new HttpEntity<>(analiseRequest, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, requestEntity, String.class);
            return response.getBody();

        } catch (RestClientException ex) {
            throw new FlaskConnectionException("Erro ao se conectar com o serviço de análise de compatibilidade.");
        }
    }

}