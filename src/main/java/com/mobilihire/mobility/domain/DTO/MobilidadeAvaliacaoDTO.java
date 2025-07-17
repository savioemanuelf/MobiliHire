package com.mobilihire.mobility.domain.DTO;

import com.smarthirepro.core.dto.AvaliacaoDto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class MobilidadeAvaliacaoDTO extends AvaliacaoDto {
    private String adequacaoMobilidade;
    private List<String> pontosFortesParaMobilidade;
    private List<String> gapsDesenvolvimento;
    private String planoAcaoRecomendado;

    public String getAdequacaoMobilidade() {
        return this.adequacaoMobilidade;
    }

    public List<String> getPontosFortesParaMobilidade() {
        return this.pontosFortesParaMobilidade;
    }

    public List<String> getGapsDesenvolvimento() {
        return this.gapsDesenvolvimento;
    }

    public String getPlanoAcaoRecomendado() {
        return this.planoAcaoRecomendado;
    }

    public void setAdequacaoMobilidade(String adequacaoMobilidade) {
        this.adequacaoMobilidade = adequacaoMobilidade;
    }

    public void setPontosFortesParaMobilidade(List<String> pontosFortesParaMobilidade) {
        this.pontosFortesParaMobilidade = pontosFortesParaMobilidade;
    }

    public void setGapsDesenvolvimento(List<String> gapsDesenvolvimento) {
        this.gapsDesenvolvimento = gapsDesenvolvimento;
    }

    public void setPlanoAcaoRecomendado(String planoAcaoRecomendado) {
        this.planoAcaoRecomendado = planoAcaoRecomendado;
    }
}