package com.mobilihire.mobility.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smarthirepro.core.service.impl.AnaliseTemplate;

@Service
public class AnaliseService {
    @Autowired
    private AnaliseTemplate analise;

    public String realizarAnalise(UUID id) {

        return analise.runAnalise(id);
    }
}
