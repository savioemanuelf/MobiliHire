package com.mobilihire.mobility.domain.repository;


import java.util.List;
import java.util.UUID;

import com.smarthirepro.domain.repositories.CargoRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mobilihire.mobility.domain.model.OportunidadeInterna;

@Repository
public interface OportunidadeInternaRepositoryJpa extends JpaRepository<OportunidadeInterna, UUID>, CargoRepository<OportunidadeInterna> {

    List<OportunidadeInterna> findByEmpresaId(UUID empresaId);

    List<OportunidadeInterna> findByTipoMobilidade(String tipoMobilidade);

    List<OportunidadeInterna> findByDepartamentoOrigem(String departamentoOrigem);

    List<OportunidadeInterna> findByDepartamentoDestino(String departamentoDestino);

    @Query("SELECT o FROM OportunidadeInterna o WHERE o.departamentoOrigem = :departamento OR o.departamentoDestino = :departamento")
    List<OportunidadeInterna> findByDepartamento(@Param("departamento") String departamento);

    List<OportunidadeInterna> findByNivelOrigem(String nivelOrigem);

    List<OportunidadeInterna> findByNivelDestino(String nivelDestino);

    @Query("SELECT o FROM OportunidadeInterna o WHERE o.isActive = true AND o.empresa.id = :empresaId")
    List<OportunidadeInterna> findActiveByEmpresa(@Param("empresaId") UUID empresaId);

    @Query("SELECT o FROM OportunidadeInterna o WHERE o.isActive = true AND o.departamentoOrigem = :departamento")
    List<OportunidadeInterna> findActiveByDepartamentoOrigem(@Param("departamento") String departamento);
}