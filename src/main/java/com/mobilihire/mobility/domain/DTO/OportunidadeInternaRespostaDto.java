package com.mobilihire.mobility.domain.DTO;

import java.util.UUID;

public record OportunidadeInternaRespostaDto (
    UUID id,
    String nome,
    boolean isActive,
    String empresaNome,
    String tipoMobilidade,
    String departamentoOrigem,
    String departamentoDestino,
    String nivelOrigem,
    String nivelDestino,
    Integer prazoCandidatura,
    Boolean requerAprovacaoGestor,
    OportunidadeRequisitosDto requisitos
) {} 