package com.mobilihire.mobility.domain.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ColaboradorUpdateDTO(
        @NotBlank String matricula,
        @NotBlank String departamentoAtual,
        @NotBlank String cargoAtual,
        @NotBlank String nivelAtual,
        @NotNull Double avaliacaoDesempenho
) {}