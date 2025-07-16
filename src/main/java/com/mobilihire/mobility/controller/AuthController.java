package com.mobilihire.mobility.controller;

import com.mobilihire.mobility.service.EmpresaService;
import com.smarthirepro.core.dto.AuthDto;
import com.smarthirepro.core.service.impl.AuthService;
import com.smarthirepro.domain.model.Empresa;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthDto authDto) {
        try {
            return ResponseEntity.ok(authService.login(authDto));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Email ou senha inválidos"));
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarEmpresa(@Valid @RequestBody Empresa empresa) {
        empresaService.salvar(empresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
    }

}
