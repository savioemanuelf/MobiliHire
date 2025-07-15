package com.mobilihire.mobility.domain.model;


import java.util.ArrayList;
import java.util.List;

import com.smarthirepro.domain.model.CargoGenerico;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "oportunidade_interna")
public class OportunidadeInterna extends CargoGenerico {

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    @Column(name = "pontuacao_minima")
    private Double pontuacaoMinima;

    @Column(name = "tipo_mobilidade")
    private String tipoMobilidade; // HORIZONTAL, VERTICAL, DIAGONAL

    @Column(name = "departamento_origem")
    private String departamentoOrigem;

    @Column(name = "departamento_destino")
    private String departamentoDestino;

    @Column(name = "nivel_origem")
    private String nivelOrigem;

    @Column(name = "nivel_destino")
    private String nivelDestino;

    @Column(name = "prazo_candidatura")
    private Integer prazoCandidatura; // em dias

    @Column(name = "requer_aprovacao_gestor")
    private Boolean requerAprovacaoGestor;

//    @OneToMany(mappedBy = "oportunidade", cascade = CascadeType.ALL, orphanRemoval = true)
//    @OrderBy("ordem ASC")
//    private List<EtapaMobilidade> etapas = new ArrayList<>();
}