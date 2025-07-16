package com.mobilihire.mobility.domain.model;

import com.smarthirepro.domain.model.CargoCompetenciasGenerico;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "oportunidade_requisitps")
public class OportunidadeRequisitos extends CargoCompetenciasGenerico {
    private Double pesoHabilidades;
    private Double pesoIdiomas;
    private Double pesoFormacaoAcademica;
    private Double pesoExperiencia;

    public Double getPesoHabilidades() {
        return this.pesoHabilidades;
    }

    public Double getPesoIdiomas() {
        return this.pesoIdiomas;
    }

    public Double getPesoFormacaoAcademica() {
        return this.pesoFormacaoAcademica;
    }

    public Double getPesoExperiencia() {
        return this.pesoExperiencia;
    }

    public void setPesoHabilidades(Double pesoHabilidades) {
        this.pesoHabilidades = pesoHabilidades;
    }

    public void setPesoIdiomas(Double pesoIdiomas) {
        this.pesoIdiomas = pesoIdiomas;
    }

    public void setPesoFormacaoAcademica(Double pesoFormacaoAcademica) {
        this.pesoFormacaoAcademica = pesoFormacaoAcademica;
    }

    public void setPesoExperiencia(Double pesoExperiencia) {
        this.pesoExperiencia = pesoExperiencia;
    }
}
