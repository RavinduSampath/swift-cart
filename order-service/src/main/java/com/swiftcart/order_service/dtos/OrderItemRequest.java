package com.swiftcart.order_service.dtos;

import java.math.BigDecimal;

public record OrderItemRequest(
        Long productId,
        Integer quantity,
        BigDecimal price
) {}