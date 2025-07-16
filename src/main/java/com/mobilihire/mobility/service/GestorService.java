package com.mobilihire.mobility.service;

import com.mobilihire.mobility.domain.DTO.ColaboradorRespostaDTO;
import com.mobilihire.mobility.domain.DTO.ColaboradorUpdateDTO;
import com.mobilihire.mobility.domain.model.Colaborador;
import com.mobilihire.mobility.domain.repository.ColaboradorRepositoryJpa;
import com.mobilihire.mobility.exception.NotificationException;
import com.smarthirepro.core.dto.EmailRequest;
import com.smarthirepro.core.exception.BusinessRuleException;
import com.smarthirepro.core.service.IEmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GestorService {

    @Autowired
    private ColaboradorRepositoryJpa colaboradorRepository;
    @Autowired
    private IEmailService emailService;


    @Transactional
    public ColaboradorRespostaDTO atualizarDadosColaborador(UUID colaboradorId, ColaboradorUpdateDTO dto) {
        String email = colaboradorRepository.findById(colaboradorId).get().getEmail();
        Colaborador colaborador = (Colaborador) colaboradorRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Colaborador com ID " + colaboradorId + " não encontrado."));

        colaborador.setMatricula(dto.matricula());
        colaborador.setDepartamentoAtual(dto.departamentoAtual());
        colaborador.setCargoAtual(dto.cargoAtual());
        colaborador.setNivelAtual(dto.nivelAtual());
        colaborador.setAvaliacaoDesempenho(dto.avaliacaoDesempenho());

        notificarColaborador(colaborador);
        return toRespostaDto(colaborador);
    }


    private void notificarColaborador(Colaborador colaborador) {
        if (colaborador.getEmail() == null || colaborador.getEmail().isBlank()) {
            throw new NotificationException("Colaborador " + colaborador.getNome() + " não possui e-mail para notificação.");
        }

        String nomeEmpresa;
        try {
            nomeEmpresa = colaborador.getCargo().getEmpresa().getNome();
        } catch (NullPointerException e) {
            throw new NotificationException("Não foi possível obter o nome da empresa para o colaborador: " + colaborador.getNome());
        }

        String assunto = "Atualização do seu Perfil Profissional no MobiliHire";

        String corpo = String.format(
                "Olá, %s!\n\n" +
                        "Gostaríamos de informar que seu perfil profissional na plataforma de mobilidade interna da empresa %s foi atualizado pelo seu gestor.\n\n" +
                        "As novas informações nos ajudarão a identificar as melhores oportunidades de crescimento para você.\n\n" +
                        "Se tiver alguma dúvida, por favor, converse com seu gestor ou com o RH.\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe MobiliHire.",
                colaborador.getNome(),
                nomeEmpresa
        );

        EmailRequest request = new EmailRequest(colaborador.getEmail(), assunto, corpo);
        emailService.enviarEmail(request);
    }
    private ColaboradorRespostaDTO toRespostaDto(Colaborador colaborador) {
        return new ColaboradorRespostaDTO(
                colaborador.getId(),
                colaborador.getNome(),
                colaborador.getEmail(),
                colaborador.getTelefone(),
                colaborador.getMatricula(),
                colaborador.getDepartamentoAtual(),
                colaborador.getCargoAtual(),
                colaborador.getNivelAtual(),
                colaborador.getAvaliacaoDesempenho()
        );
    }
    @Transactional
    public void promoverTodosOsCandidatos() {
        colaboradorRepository.promoverTodosParaColaborador();
    }
}