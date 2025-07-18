package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.domain.DTO.ColaboradorRespostaDTO;
import com.mobilihire.mobility.domain.model.Colaborador;
import com.mobilihire.mobility.domain.repository.ColaboradorRepositoryJpa;
import com.smarthirepro.core.exception.BusinessRuleException;
import com.smarthirepro.core.security.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    @Autowired
    private ColaboradorRepositoryJpa colaboradorRepository;

    @GetMapping
    public ResponseEntity<List<ColaboradorRespostaDTO>> listarColaboradoresDaEmpresa() {
        UUID empresaId = AuthUtils.getEmpresaId();
        List<Colaborador> colaboradores = colaboradorRepository.findByEmpresaId(empresaId);

        List<ColaboradorRespostaDTO> colaboradoresDTO = colaboradores.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(colaboradoresDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColaboradorRespostaDTO> buscarColaboradorPorId(@PathVariable UUID id) {
        return colaboradorRepository.findById(id)
                .map(this::toDto)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new BusinessRuleException("Colaborador não encontrado"));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ColaboradorRespostaDTO>> buscarColaboradoresPorNome(@RequestParam String nome) {
        List<Colaborador> colaboradores = colaboradorRepository.findByNomeContainingIgnoreCase(nome);

        List<ColaboradorRespostaDTO> colaboradoresDTO = colaboradores.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(colaboradoresDTO);
    }

    private ColaboradorRespostaDTO toDto(Colaborador colaborador) {
        return new ColaboradorRespostaDTO(
                colaborador.getId(),
                colaborador.getNome(),
                colaborador.getEmail(),
                colaborador.getTelefone(),
                colaborador.getMatricula(),
                colaborador.getDepartamentoAtual(),
                colaborador.getCargoAtual(),
                colaborador.getNivelAtual(),
                colaborador.getAvaliacaoDesempenho()
        );
    }
}