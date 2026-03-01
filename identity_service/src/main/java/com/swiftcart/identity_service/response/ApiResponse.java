package com.swiftcart.identity_service.response;

import lombok.Data;

// Every single request returns the exact same format.
@Data // automatically generates Getters, Setters, toString(), equals(), and hashCode()
public class ApiResponse {
    private String message; // holds a human-readable status message
    private Object data; // hold anything

    public ApiResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}
