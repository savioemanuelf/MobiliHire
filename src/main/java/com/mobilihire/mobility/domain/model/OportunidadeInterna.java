package com.mobilihire.mobility.domain.model;

import com.smarthirepro.domain.model.CargoGenerico;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "oportunidade_interna")
public class OportunidadeInterna extends CargoGenerico {

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    @Column(name = "pontuacao_minima")
    private Double pontuacaoMinima;

    @Column(name = "tipo_mobilidade")
    private String tipoMobilidade;

    @Column(name = "departamento_origem")
    private String departamentoOrigem;

    @Column(name = "departamento_destino")
    private String departamentoDestino;

    @Column(name = "nivel_origem")
    private String nivelOrigem;

    @Column(name = "nivel_destino")
    private String nivelDestino;

    @Column(name = "prazo_candidatura")
    private Integer prazoCandidatura;

    @Column(name = "requer_aprovacao_gestor")
    private Boolean requerAprovacaoGestor;

    public void setPontuacaoMinima(@DecimalMin("0.0") @DecimalMax("1.0") Double pontuacaoMinima) {
        this.pontuacaoMinima = pontuacaoMinima;
    }

    public void setTipoMobilidade(String tipoMobilidade) {
        this.tipoMobilidade = tipoMobilidade;
    }

    public void setDepartamentoOrigem(String departamentoOrigem) {
        this.departamentoOrigem = departamentoOrigem;
    }

    public void setDepartamentoDestino(String departamentoDestino) {
        this.departamentoDestino = departamentoDestino;
    }

    public void setNivelOrigem(String nivelOrigem) {
        this.nivelOrigem = nivelOrigem;
    }

    public void setNivelDestino(String nivelDestino) {
        this.nivelDestino = nivelDestino;
    }

    public void setPrazoCandidatura(Integer prazoCandidatura) {
        this.prazoCandidatura = prazoCandidatura;
    }

    public void setRequerAprovacaoGestor(Boolean requerAprovacaoGestor) {
        this.requerAprovacaoGestor = requerAprovacaoGestor;
    }

    public @DecimalMin("0.0") @DecimalMax("1.0") Double getPontuacaoMinima() {
        return this.pontuacaoMinima;
    }

    public String getTipoMobilidade() {
        return this.tipoMobilidade;
    }

    public String getDepartamentoOrigem() {
        return this.departamentoOrigem;
    }

    public String getDepartamentoDestino() {
        return this.departamentoDestino;
    }

    public String getNivelOrigem() {
        return this.nivelOrigem;
    }

    public String getNivelDestino() {
        return this.nivelDestino;
    }

    public Integer getPrazoCandidatura() {
        return this.prazoCandidatura;
    }

    public Boolean getRequerAprovacaoGestor() {
        return this.requerAprovacaoGestor;
    }

//    @OneToMany(mappedBy = "oportunidade", cascade = CascadeType.ALL, orphanRemoval = true)
//    @OrderBy("ordem ASC")
//    private List<EtapaMobilidade> etapas = new ArrayList<>();
}