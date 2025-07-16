package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.DTO.EmpresaPatchRequestDto;
import com.mobilihire.mobility.domain.DTO.EmpresaResponseDTO;
import com.mobilihire.mobility.domain.repository.EmpresaRepositoryJpa;
import com.mobilihire.mobility.domain.repository.OportunidadeInternaRepositoryJpa;
import com.smarthirepro.core.exception.BusinessRuleException;
import com.smarthirepro.core.security.AuthUtils;
import com.smarthirepro.domain.model.Empresa;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class EmpresaService {
    @Autowired
    private OportunidadeInternaRepositoryJpa oportunidadeRepository;

    @Autowired
    private EmpresaRepositoryJpa empresaRepository;

    @Transactional
    public Empresa salvar(Empresa empresa) {
        boolean cnpjEmUso = empresaRepository.findByCnpj(empresa.getCnpj())
                .filter(e -> !e.equals(empresa))
                .isPresent();
        if (cnpjEmUso) {
            throw new BusinessRuleException("CNPJ já cadastrado no sistema.");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String senhaCriptografada = encoder.encode(empresa.getSenha());
        empresa.setSenha(senhaCriptografada);
        return empresaRepository.save(empresa);
    }

    public List<Empresa> listarPorNome(String nomeEmpresa) {
        List<Empresa> empresas = empresaRepository.findByNomeIgnoreCase(nomeEmpresa);
        if (empresas.isEmpty()) {
            throw new BusinessRuleException("Nenhuma empresa encontrada.");
        }
        return empresas;
    }

    public EmpresaResponseDTO buscarEmpresa() {
        UUID empresaId = AuthUtils.getEmpresaId();
        Optional<Empresa> empresa = empresaRepository.findById(empresaId);
        if (empresa.isEmpty()) {
            throw new UsernameNotFoundException("Empresa não encontrada.");
        }
        return new EmpresaResponseDTO(empresa.get());
    }

    public Empresa atualizarEmpresaPorId(EmpresaPatchRequestDto data) {
        UUID id = AuthUtils.getEmpresaId();
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());
        if (data.nome() != null && !data.nome().isBlank())
            empresa.setNome(data.nome());
        if (data.cnpj() != null && !data.cnpj().isBlank())
            empresa.setCnpj(data.cnpj());
        if (data.email() != null && !data.email().isBlank())
            empresa.setEmail(data.email());
        if (data.senha() != null && !data.senha().isBlank())
            empresa.setSenha(new BCryptPasswordEncoder().encode(data.senha()));

        return empresaRepository.save(empresa);
    }

    @Transactional
    public void excluir() {
        UUID id = AuthUtils.getEmpresaId();
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Empresa não encontrada."));
        oportunidadeRepository.deleteAllByEmpresa(empresa);
        empresaRepository.delete(empresa);
    }
}
