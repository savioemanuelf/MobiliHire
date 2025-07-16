package com.mobilihire.mobility.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidatura_interna")
public class CandidaturaInterna {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "colaborador_id", nullable = false)
    private Colaborador colaborador;

    @ManyToOne
    @JoinColumn(name = "oportunidade_id", nullable = false)
    private OportunidadeInterna oportunidade;

    @Column(name = "data_candidatura")
    private LocalDateTime dataCandidatura;

    @Column(name = "status_candidatura")
    private String statusCandidatura;

    @Column(name = "pontuacao_compatibilidade")
    private Double pontuacaoCompatibilidade;

    @Column(name = "motivo_candidatura")
    private String motivoCandidatura;

    @Column(name = "expectativas_crescimento")
    private String expectativasCrescimento;

    @Column(name = "aprovacao_gestor")
    private Boolean aprovacaoGestor;

    @Column(name = "comentario_gestor")
    private String comentarioGestor;

    @Column(name = "etapa_atual")
    private String etapaAtual;

    @Column(name = "data_ultima_atualizacao")
    private LocalDateTime dataUltimaAtualizacao;
}