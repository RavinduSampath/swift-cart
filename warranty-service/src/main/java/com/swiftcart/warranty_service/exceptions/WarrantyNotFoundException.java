package com.swiftcart.warranty_service.exceptions;

public class WarrantyNotFoundException extends RuntimeException {
    public WarrantyNotFoundException(String message) {
        super(message);
    }
}