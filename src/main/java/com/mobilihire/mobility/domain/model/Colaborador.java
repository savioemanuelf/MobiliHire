package com.mobilihire.mobility.domain.model;

import com.smarthirepro.domain.model.Candidato;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Colaborador extends Candidato {

    @Column(name = "matricula")
    private String matricula;

    @Column(name = "departamento_atual")
    private String departamentoAtual;

    @Column(name = "cargo_atual")
    private String cargoAtual;

    @Column(name = "nivel_atual")
    private String nivelAtual;

    @Column(name = "avaliacao_desempenho")
    private Double avaliacaoDesempenho;

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public void setDepartamentoAtual(String departamentoAtual) {
        this.departamentoAtual = departamentoAtual;
    }

    public void setCargoAtual(String cargoAtual) {
        this.cargoAtual = cargoAtual;
    }

    public void setNivelAtual(String nivelAtual) {
        this.nivelAtual = nivelAtual;
    }

    public void setAvaliacaoDesempenho(Double avaliacaoDesempenho) {
        this.avaliacaoDesempenho = avaliacaoDesempenho;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public String getDepartamentoAtual() {
        return this.departamentoAtual;
    }

    public String getCargoAtual() {
        return this.cargoAtual;
    }

    public String getNivelAtual() {
        return this.nivelAtual;
    }

    public Double getAvaliacaoDesempenho() {
        return this.avaliacaoDesempenho;
    }
}