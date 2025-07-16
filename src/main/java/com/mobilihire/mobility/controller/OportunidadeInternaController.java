package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.domain.DTO.OportunidadeInternaDto;
import com.mobilihire.mobility.domain.DTO.OportunidadeInternaRespostaDto;
import com.mobilihire.mobility.domain.model.OportunidadeInterna;
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

    @GetMapping
    public ResponseEntity<List<OportunidadeInternaRespostaDto>> listarOportunidadesDaEmpresa() {
        List<OportunidadeInternaRespostaDto> oportunidades = oportunidadeService.listarTodasPorEmpresa();
        return ResponseEntity.ok(oportunidades);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OportunidadeInterna> buscarOportunidadePorId(@PathVariable UUID id) {
        OportunidadeInterna oportunidade = oportunidadeService.listarPorId(id);
        return ResponseEntity.ok(oportunidade);
    }

    @PostMapping
    public ResponseEntity<?> adicionarOportunidade(@Valid @RequestBody OportunidadeInternaDto dto) {
        oportunidadeService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerOportunidade(@PathVariable UUID id) {
        oportunidadeService.excluir(id);
        return ResponseEntity.noContent().build();
    }
} 