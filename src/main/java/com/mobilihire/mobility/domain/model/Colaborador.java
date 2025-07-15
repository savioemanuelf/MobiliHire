package com.mobilihire.mobility.domain.model;

import com.smarthirepro.domain.model.Candidato;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Colaborador extends Candidato {

    @Column(name = "matricula")
    private String matricula;

    @Column(name = "departamento_atual")
    private String departamentoAtual;

    @Column(name = "cargo_atual")
    private String cargoAtual;

    @Column(name = "nivel_atual")
    private String nivelAtual;

    @Column(name = "data_admissao")
    private String dataAdmissao;

    @Column(name = "gestor_direto")
    private String gestorDireto;

    @Column(name = "tempo_empresa")
    private Integer tempoEmpresa; // em meses

    @Column(name = "avaliacao_desempenho")
    private Double avaliacaoDesempenho; // 0.0 a 5.0

    @Column(name = "historico_mobilidade")
    private String historicoMobilidade; // JSON com histórico de mobilidades

    @Column(name = "interesse_mobilidade")
    private Boolean interesseMobilidade;

    @Column(name = "areas_interesse")
    private String areasInteresse; // JSON com áreas de interesse
}