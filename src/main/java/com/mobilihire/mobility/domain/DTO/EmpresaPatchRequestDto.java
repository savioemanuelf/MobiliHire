package com.mobilihire.mobility.domain.DTO;

public record EmpresaPatchRequestDto(
    String nome,
    String cnpj,
    String telefone,
    String email,
    String senha
) {}