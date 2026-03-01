package com.swiftcart.identity_service.exceptions;

import com.swiftcart.identity_service.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ApiResponse> handleAuthException(AuthException ex) {
        return new ResponseEntity<>(
                new ApiResponse(ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }
}
