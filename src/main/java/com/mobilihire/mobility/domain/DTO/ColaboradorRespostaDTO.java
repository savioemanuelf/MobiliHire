package com.mobilihire.mobility.domain.DTO;

import java.util.UUID;

public record ColaboradorRespostaDTO(
        UUID id,
        String nome,
        String email,
        String telefone,
        String matricula,
        String departamentoAtual,
        String cargoAtual,
        String nivelAtual,
        Double avaliacaoDesempenho
) {}