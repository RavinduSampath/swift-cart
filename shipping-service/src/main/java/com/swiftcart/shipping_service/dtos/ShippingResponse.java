package com.swiftcart.shipping_service.dtos;

import com.swiftcart.shipping_service.model.ShippingStatus;

import java.time.LocalDate;

public record ShippingResponse(
        Long id,
        Long orderId,
        String trackingNumber,
        ShippingStatus status,
        String carrier,
        String shippingAddress,
        LocalDate estimatedDeliveryDate
) {}

