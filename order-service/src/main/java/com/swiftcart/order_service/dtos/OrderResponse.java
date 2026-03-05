package com.swiftcart.order_service.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,
        Long userId,
        List<OrderItemResponse> orderItems,
        BigDecimal totalAmount,
//        OrderStatus orderStatus,
//        PaymentStatus paymentStatus,
        LocalDateTime orderDate,
        String shippingAddress
) {}