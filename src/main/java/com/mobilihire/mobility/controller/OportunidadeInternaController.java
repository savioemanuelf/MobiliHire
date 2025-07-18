package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.domain.DTO.MobilidadeAvaliacaoDTO;
import com.mobilihire.mobility.domain.DTO.OportunidadeInternaDto;
import com.mobilihire.mobility.domain.DTO.OportunidadeInternaRespostaDto;
import com.mobilihire.mobility.domain.model.OportunidadeInterna;
import com.mobilihire.mobility.service.AnaliseService;
import com.mobilihire.mobility.service.AvaliacaoMobilidadePromptService;
import com.mobilihire.mobility.service.MobilidadeAvaliacaoService;
import com.mobilihire.mobility.service.OportunidadeInternaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/oportunidades-internas")
public class OportunidadeInternaController {

    @Autowired
    private OportunidadeInternaService oportunidadeService;
    @Autowired
    private AnaliseService analiseService;
//    @Autowired
//    private AvaliacaoMobilidadePromptService mobilidadeAvaliacaoService;
    @Autowired
    private MobilidadeAvaliacaoService mobilidadeAvaliacaoService;



    @GetMapping
    public ResponseEntity<List<OportunidadeInternaRespostaDto>> listarOportunidadesDaEmpresa() {
        List<OportunidadeInternaRespostaDto> oportunidades = oportunidadeService.listarTodasPorEmpresa();
        return ResponseEntity.ok(oportunidades);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OportunidadeInternaRespostaDto> buscarOportunidadePorId(@PathVariable UUID id) {
        OportunidadeInterna oportunidade = oportunidadeService.listarPorId(id);
        OportunidadeInternaRespostaDto oportunidadeDto = oportunidadeService.toRespostaDto(oportunidade);
        return ResponseEntity.ok(oportunidadeDto);
    }

    @PostMapping
    public ResponseEntity<?> adicionarOportunidade(@Valid @RequestBody OportunidadeInternaDto dto) {
        oportunidadeService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/{id}/compatibilidade")
    public ResponseEntity<String> compatibilidade(@PathVariable UUID id) {
        return ResponseEntity.ok(analiseService.realizarAnalise(id));
    }

    @PostMapping("/{oportunidadeId}/colaboradores/{colaboradorId}/avaliar")
    public ResponseEntity<MobilidadeAvaliacaoDTO> avaliarColaboradorParaOportunidade(
            @PathVariable UUID oportunidadeId,
            @PathVariable UUID colaboradorId) {

        MobilidadeAvaliacaoDTO avaliacao = mobilidadeAvaliacaoService.realizarAvaliacao(oportunidadeId, colaboradorId);
        return ResponseEntity.ok(avaliacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerOportunidade(@PathVariable UUID id) {
        oportunidadeService.excluir(id);
        return ResponseEntity.noContent().build();
    }
} 