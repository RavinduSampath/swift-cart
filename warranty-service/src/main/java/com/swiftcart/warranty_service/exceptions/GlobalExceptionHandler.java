package com.swiftcart.warranty_service.exceptions;

import com.swiftcart.warranty_service.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WarrantyNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleWarrantyNotFound(WarrantyNotFoundException ex) {
        ApiResponse<Void> response = new ApiResponse<>(ex.getMessage(), false, null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}