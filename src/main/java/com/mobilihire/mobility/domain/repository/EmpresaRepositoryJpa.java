package com.mobilihire.mobility.domain.repository;

import com.smarthirepro.domain.model.Empresa;
import com.smarthirepro.domain.repositories.EmpresaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmpresaRepositoryJpa
        extends JpaRepository<Empresa, UUID>, EmpresaRepository {

    @Override
    Optional<Empresa> findByEmail(String email);

    @Override
    Optional<Empresa> findByCnpj(String cnpj);

    @Override
    Empresa save(Empresa empresa);

    @Override
    Optional<Empresa> findById(UUID empresaId);

    List<Empresa> findByNomeIgnoreCase(String nomeEmpresa);
}