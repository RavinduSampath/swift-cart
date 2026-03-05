package com.swiftcart.notification_service.Exception;

import com.swiftcart.notification_service.Exception.NotificationNotFoundException;
import com.swiftcart.notification_service.Response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotificationNotFoundException.class)
    public ResponseEntity<ApiResponse> handleNotificationNotFound(NotificationNotFoundException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), null), HttpStatus.NOT_FOUND);
    }
}