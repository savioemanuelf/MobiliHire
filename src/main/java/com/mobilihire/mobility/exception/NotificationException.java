package com.mobilihire.mobility.exception;

import com.smarthirepro.core.exception.BusinessBaseException;
import org.springframework.http.HttpStatus;

public class NotificationException extends BusinessBaseException {
    public NotificationException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}