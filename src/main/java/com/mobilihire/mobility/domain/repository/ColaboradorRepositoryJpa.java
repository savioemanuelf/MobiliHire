package com.mobilihire.mobility.domain.repository;
import com.mobilihire.mobility.domain.model.Colaborador;
import com.smarthirepro.domain.repositories.CandidatoRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ColaboradorRepositoryJpa extends JpaRepository<Colaborador, UUID>, CandidatoRepository {

    @Modifying
    @Query(value = "UPDATE candidato SET dtype = 'Colaborador' WHERE dtype = 'Candidato'", nativeQuery = true)
    void promoverTodosParaColaborador();

    List<Colaborador> findByCargo_Id(UUID cargoId);

    @Query("SELECT c FROM Colaborador c WHERE c.cargo.empresa.id = :empresaId")
    List<Colaborador> findByEmpresaId(@Param("empresaId") UUID empresaId);

    List<Colaborador> findByNomeContainingIgnoreCase(String nome);
}