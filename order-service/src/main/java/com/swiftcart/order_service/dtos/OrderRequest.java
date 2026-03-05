package com.swiftcart.order_service.dtos;

import java.util.List;

public record OrderRequest(
        Long userId,
        List<OrderItemRequest> orderItems,
        String shippingAddress
) {}