package com.mobilihire.mobility.domain.repository;

import com.mobilihire.mobility.domain.model.OportunidadeRequisitos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OportunidadeRequisitosRepository extends JpaRepository<OportunidadeRequisitos, UUID> {
    OportunidadeRequisitos findByCargo_Id(UUID oportunidadeId);

}