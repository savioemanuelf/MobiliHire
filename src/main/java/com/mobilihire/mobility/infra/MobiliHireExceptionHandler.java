package com.mobilihire.mobility.infra;

import com.mobilihire.mobility.exception.NotificationException;
import com.smarthirepro.core.infra.BaseErrorMessage;
import com.smarthirepro.core.infra.BaseExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class MobiliHireExceptionHandler extends BaseExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(MobiliHireExceptionHandler.class);

    @ExceptionHandler(NotificationException.class)
    public ResponseEntity<BaseErrorMessage> handleNotificationException(NotificationException ex) {
        logger.warn("Falha na notificação: {}", ex.getMessage());

        BaseErrorMessage response = new BaseErrorMessage(ex.getStatus(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(response);
    }
}