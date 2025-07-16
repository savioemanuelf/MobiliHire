package com.mobilihire.mobility.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smarthirepro.core.service.impl.CurriculoService;
import com.smarthirepro.domain.model.Curriculo;

@RestController
@RequestMapping("/curriculos")
public class CurriculoController {

    @Autowired
    private CurriculoService curriculoService;

    @PostMapping("/analisar-curriculos/{idOportunidade}")
    public ResponseEntity<?> analisarCurriculos(@PathVariable("idOportunidade") UUID idOportunidade,
                                                @RequestParam("file") MultipartFile file) {
        String path = curriculoService.pegarCaminhoDoCurriculo(file, idOportunidade);
        List<Curriculo> result = curriculoService.salvarCurriculo(path, idOportunidade);
        return ResponseEntity.ok(result);
    }
} 