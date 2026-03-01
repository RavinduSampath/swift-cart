package com.swiftcart.identity_service.dtos;

public record AuthRequest(
        String username,
        String password
) {}
