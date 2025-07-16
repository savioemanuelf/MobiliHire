package com.mobilihire.mobility.domain.DTO;

public record OportunidadeRequisitosDto (
    String habilidades,
    String idiomas,
    String formacaoAcademica,
    String experiencia,
    Double pesoHabilidades,
    Double pesoIdiomas,
    Double pesoFormacaoAcademica,
    Double pesoExperiencia
) {} 