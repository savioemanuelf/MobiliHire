package com.mobilihire.mobility.config;

import com.mobilihire.mobility.domain.DTO.MobilidadeAvaliacaoDTO;
import com.smarthirepro.core.service.IAvaliacaoLlm;
import com.smarthirepro.core.service.impl.AvaliacaoLlmImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FrameworkBeansConfig {
    @Bean
    public AvaliacaoLlmImpl<MobilidadeAvaliacaoDTO> avaliacaoLlmImpl(IAvaliacaoLlm avaliacaoLlm) {
        return new AvaliacaoLlmImpl<>(avaliacaoLlm, MobilidadeAvaliacaoDTO.class);
    }
}
