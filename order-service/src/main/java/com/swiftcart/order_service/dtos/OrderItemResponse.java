package com.swiftcart.order_service.dtos;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long productId,
        Integer quantity,
        BigDecimal price
) {}