package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.DTO.OportunidadeInternaDto;
import com.mobilihire.mobility.domain.DTO.OportunidadeInternaRespostaDto;
import com.mobilihire.mobility.domain.DTO.OportunidadeRequisitosDto;
import com.mobilihire.mobility.domain.model.OportunidadeInterna;
import com.mobilihire.mobility.domain.model.OportunidadeRequisitos;
import com.mobilihire.mobility.domain.repository.OportunidadeInternaRepositoryJpa;
import com.smarthirepro.core.exception.BusinessRuleException;
import com.smarthirepro.core.security.AuthUtils;
import com.smarthirepro.domain.model.Empresa;
import com.mobilihire.mobility.domain.repository.EmpresaRepositoryJpa;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OportunidadeInternaService {

    @Autowired
    private OportunidadeInternaRepositoryJpa oportunidadeRepository;
    @Autowired
    private EmpresaRepositoryJpa empresaRepository;

    @Transactional
    public void salvar(OportunidadeInternaDto dto) {
        validarPesos(dto);
        UUID empresaId = AuthUtils.getEmpresaId();
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new BusinessRuleException("Empresa com Id " + empresaId + " não encontrada."));
        OportunidadeInterna oportunidade = new OportunidadeInterna();
        oportunidade.setNome(dto.nome());
        oportunidade.setEmpresa(empresa);
        oportunidade.setActive(dto.isActive());
        oportunidade.setPontuacaoMinima(dto.pontuacaoMinima());
        oportunidade.setTipoMobilidade(dto.tipoMobilidade());
        oportunidade.setDepartamentoOrigem(dto.departamentoOrigem());
        oportunidade.setDepartamentoDestino(dto.departamentoDestino());
        oportunidade.setNivelOrigem(dto.nivelOrigem());
        oportunidade.setNivelDestino(dto.nivelDestino());
        oportunidade.setPrazoCandidatura(dto.prazoCandidatura());
        oportunidade.setRequerAprovacaoGestor(dto.requerAprovacaoGestor());

        OportunidadeRequisitos requisitos = new OportunidadeRequisitos();
        requisitos.setHabilidades(dto.habilidades());
        requisitos.setIdiomas(dto.idiomas());
        requisitos.setFormacaoAcademica(dto.formacaoAcademica());
        requisitos.setExperiencia(dto.experiencia());
        requisitos.setPesoHabilidades(dto.pesoHabilidades());
        requisitos.setPesoIdiomas(dto.pesoIdiomas());
        requisitos.setPesoFormacaoAcademica(dto.pesoFormacaoAcademica());
        requisitos.setPesoExperiencia(dto.pesoExperiencia());

        requisitos.setCargo(oportunidade);
        oportunidade.setRequisitos(requisitos);
        oportunidadeRepository.save(oportunidade);
    }

    public List<OportunidadeInternaRespostaDto> listarTodasPorEmpresa() {
        UUID empresaId = AuthUtils.getEmpresaId();
        List<OportunidadeInterna> oportunidades = oportunidadeRepository.findByEmpresaId(empresaId);
        return oportunidades.stream()
                .map(this::toRespostaDto)
                .toList();
    }

    public OportunidadeInterna listarPorId(UUID id) {
        OportunidadeInterna oportunidade = oportunidadeRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Oportunidade não encontrada."));
        return oportunidade;
    }

    public void excluir(UUID id) {
        OportunidadeInterna oportunidade = oportunidadeRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Oportunidade não encontrada."));
        oportunidadeRepository.delete(oportunidade);
    }

    private void validarPesos(OportunidadeInternaDto dto) {
        double somaPesos = dto.pesoHabilidades() +
                dto.pesoIdiomas() +
                dto.pesoFormacaoAcademica() +
                dto.pesoExperiencia();
        if (Math.abs(somaPesos - 1.0) > 0.0001) {
            throw new BusinessRuleException("A soma dos pesos deve ser igual a 1.0. Valor atual: " + somaPesos);
        }
    }

    private OportunidadeInternaRespostaDto toRespostaDto(OportunidadeInterna oportunidade) {
        if (oportunidade == null) {
            return null;
        }

        OportunidadeRequisitos requisitos = (OportunidadeRequisitos) oportunidade.getRequisitos();

        OportunidadeRequisitosDto requisitosDto = new OportunidadeRequisitosDto(
                requisitos.getHabilidades(),
                requisitos.getIdiomas(),
                requisitos.getFormacaoAcademica(),
                requisitos.getExperiencia(),
                requisitos.getPesoHabilidades(),
                requisitos.getPesoIdiomas(),
                requisitos.getPesoFormacaoAcademica(),
                requisitos.getPesoExperiencia()
        );

        return new OportunidadeInternaRespostaDto(
                oportunidade.getId(),
                oportunidade.getNome(),
                oportunidade.isActive(),
                oportunidade.getEmpresa().getNome(),
                oportunidade.getTipoMobilidade(),
                oportunidade.getDepartamentoOrigem(),
                oportunidade.getDepartamentoDestino(),
                oportunidade.getNivelOrigem(),
                oportunidade.getNivelDestino(),
                oportunidade.getPrazoCandidatura(),
                oportunidade.getRequerAprovacaoGestor(),
                requisitosDto
        );
    }
}