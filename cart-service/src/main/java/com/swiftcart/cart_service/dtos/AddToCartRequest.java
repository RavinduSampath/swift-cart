package com.swiftcart.cart_service.dtos;

public record AddToCartRequest(
        Long userId,
        Long productId,
        Integer quantity
) {}