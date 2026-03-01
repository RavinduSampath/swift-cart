package com.swiftcart.identity_service.dtos;

public record RegisterRequest(
        String name,
        String email,
        String password
) {}
