package com.mobilihire.mobility.domain.DTO;

import com.smarthirepro.domain.model.Empresa;

public record EmpresaResponseDTO(
    String id,
    String nome,
    String cnpj,
    String email) {
  public EmpresaResponseDTO(Empresa empresa) {
    this(empresa.getId().toString(), empresa.getNome(), empresa.getCnpj(), empresa.getEmail());
  }
}
