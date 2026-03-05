package com.swiftcart.order_service.mapper;

import com.swiftcart.order_service.dtos.*;
import com.swiftcart.order_service.model.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public Order toEntity(OrderRequest request) {
        if (request == null) return null;
//
        Order order = new Order();
//        order.setUserId(request.userId());
//        order.setShippingAddress(request.shippingAddress());
//        order.setOrderStatus(OrderStatus.PENDING);
//        order.setPaymentStatus(PaymentStatus.PENDING);
//
//        List<OrderItem> items = request.orderItems()
//                .stream()
//                .map(itemReq -> {
//                    OrderItem item = new OrderItem();
//                    item.setProductId(itemReq.productId());
//                    item.setQuantity(itemReq.quantity());
//                    item.setPrice(itemReq.price());
//                    item.setOrder(order);
//                    return item;
//                }).collect(Collectors.toList());
//
//        order.setOrderItems(items);
//
//        BigDecimal total = items.stream()
//                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        order.setTotalAmount(total);

        return order;
    }

    public OrderResponse toResponse(Order order) {
//        if (order == null) return null;
//
//        List<OrderItemResponse> items = order.getOrderItems()
//                .stream()
//                .map(i -> new OrderItemResponse(
//                        i.getProductId(),
//                        i.getQuantity(),
//                        i.getPrice()
//                )).toList();
//
//        return new OrderResponse(
//                order.getId(),
//                order.getOrderNumber(),
//                order.getUserId(),
//                items,
//                order.getTotalAmount(),
//                order.getOrderStatus(),
//                order.getPaymentStatus(),
//                order.getOrderDate(),
//                order.getShippingAddress()
//        );
        return new OrderResponse(
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
    }
}