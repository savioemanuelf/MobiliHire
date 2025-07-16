package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.domain.DTO.EmpresaPatchRequestDto;
import com.mobilihire.mobility.domain.DTO.EmpresaResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mobilihire.mobility.service.EmpresaService;
import com.smarthirepro.domain.model.Empresa;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping("/me")
    public ResponseEntity<Object> buscarEmpresa() {
        EmpresaResponseDTO empresa = empresaService.buscarEmpresa();
        return ResponseEntity.ok(empresa);
    }

    @PatchMapping
    public ResponseEntity<Empresa> atualizarEmpresaPorId(@Valid @RequestBody EmpresaPatchRequestDto data) {
        Empresa empresaAtualizada = empresaService.atualizarEmpresaPorId(data);
        return ResponseEntity.ok(empresaAtualizada);
    }

    @DeleteMapping
    public ResponseEntity<Void> removerEmpresa() {
        empresaService.excluir();
        return ResponseEntity.noContent().build();
    }
}
