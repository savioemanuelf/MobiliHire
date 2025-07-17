package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.DTO.MobilidadeAvaliacaoDTO; // O DTO que define a estrutura do seu relatório
import com.smarthirepro.core.service.impl.AvaliacaoLlmImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MobilidadeAvaliacaoService {
    @Autowired
    private AvaliacaoLlmImpl<MobilidadeAvaliacaoDTO> avaliacaoLlm;

    public MobilidadeAvaliacaoDTO realizarAvaliacao(UUID oportunidadeId, UUID colaboradorId) {
        return avaliacaoLlm.realizarAvaliacao(oportunidadeId, colaboradorId);
    }
}