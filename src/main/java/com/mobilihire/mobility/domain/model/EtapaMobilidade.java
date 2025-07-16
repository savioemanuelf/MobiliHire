package com.mobilihire.mobility.domain.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EtapaMobilidade {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String titulo;
    private String descricao;
    private int ordem;

    @Column(name = "tipo_etapa")
    private String tipoEtapa;

    @Column(name = "prazo_etapa")
    private Integer prazoEtapa;

    @Column(name = "responsavel_etapa")
    private String responsavelEtapa;

    @ManyToOne
    @JoinColumn(name = "oportunidade_id", nullable = false)
    private OportunidadeInterna oportunidade;
}