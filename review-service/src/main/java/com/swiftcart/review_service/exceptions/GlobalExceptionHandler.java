package com.swiftcart.review_service.exceptions;

import com.swiftcart.review_service.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleReviewNotFound(ReviewNotFoundException ex) {
        ApiResponse<Void> response = new ApiResponse<>(ex.getMessage(), false, null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}