package com.mobilihire.mobility.domain.DTO;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record OportunidadeInternaDto (
    @NotBlank(message="O nome da oportunidade é obrigatório")
    String nome,

    UUID empresaId,
    boolean isActive,

    @NotBlank(message= "As habilidades necessárias são obrigatórias")
    String habilidades,

    String idiomas,

    @NotBlank(message = "A formação acadêmica é obrigatória")
    String formacaoAcademica,
    String experiencia,

    @NotNull(message = "O peso das habilidades é obrigatório.")
    @DecimalMin(value = "0.0", message = "O peso das habilidades não pode ser menor que 0.")
    @DecimalMax(value = "1.0", message = "O peso das habilidades não pode ser maior que 1.")
    Double pesoHabilidades,

    @NotNull(message = "O peso dos idiomas é obrigatório.")
    @DecimalMin(value = "0.0", message = "O peso dos idiomas não pode ser menor que 0.")
    @DecimalMax(value = "1.0", message = "O peso dos idiomas não pode ser maior que 1.")
    Double pesoIdiomas,

    @NotNull(message = "O peso da formação acadêmica é obrigatório.")
    @DecimalMin(value = "0.0", message = "O peso da formação acadêmica não pode ser menor que 0.")
    @DecimalMax(value = "1.0", message = "O peso da formação acadêmica não pode ser maior que 1.")
    Double pesoFormacaoAcademica,

    @NotNull(message = "O peso da experiência é obrigatório.")
    @DecimalMin(value = "0.0", message = "O peso da experiência não pode ser menor que 0.")
    @DecimalMax(value = "1.0", message = "O peso da experiência não pode ser maior que 1.")
    Double pesoExperiencia,

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    Double pontuacaoMinima,

    @NotBlank(message = "O tipo de mobilidade é obrigatório")
    String tipoMobilidade,

    @NotBlank(message = "O departamento de origem é obrigatório")
    String departamentoOrigem,

    @NotBlank(message = "O departamento de destino é obrigatório")
    String departamentoDestino,

    @NotBlank(message = "O nível de origem é obrigatório")
    String nivelOrigem,

    @NotBlank(message = "O nível de destino é obrigatório")
    String nivelDestino,

    @NotNull(message = "O prazo de candidatura é obrigatório")
    Integer prazoCandidatura,

    @NotNull(message = "É necessário definir se requer aprovação do gestor")
    Boolean requerAprovacaoGestor
) {} 