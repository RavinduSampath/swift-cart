package com.swiftcart.shipping_service.dtos;

public record ShippingRequest(
        Long orderId,
        String carrier,
        String shippingAddress
) {}
