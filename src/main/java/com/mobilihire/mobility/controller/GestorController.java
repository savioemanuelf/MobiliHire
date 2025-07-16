package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.domain.DTO.ColaboradorRespostaDTO;
import com.mobilihire.mobility.domain.DTO.ColaboradorUpdateDTO;
import com.mobilihire.mobility.service.GestorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/gestor")
@RequiredArgsConstructor
public class GestorController {
    @Autowired
    private GestorService gestorService;


    @PatchMapping("/colaboradores/{id}")
    public ResponseEntity<ColaboradorRespostaDTO> atualizarDadosColaborador(
            @PathVariable UUID id,
            @RequestBody @Valid ColaboradorUpdateDTO dto) {
        gestorService.promoverTodosOsCandidatos();
        ColaboradorRespostaDTO colaboradorAtualizado = gestorService.atualizarDadosColaborador(id, dto);
        return ResponseEntity.ok(colaboradorAtualizado);
    }
}