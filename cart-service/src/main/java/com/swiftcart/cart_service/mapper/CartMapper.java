package com.swiftcart.cart_service.mapper;

import com.swiftcart.cart_service.dtos.CartItemResponse;
import com.swiftcart.cart_service.dtos.CartResponse;
import com.swiftcart.cart_service.model.Cart;
import com.swiftcart.cart_service.model.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapper {

    public CartResponse toResponse(Cart cart) {
        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(this::toItemResponse)
                .collect(Collectors.toList());

        return new CartResponse(
                cart.getId(),
                cart.getUserId(),
                itemResponses,
                cart.getTotalCartValue()
        );
    }

    private CartItemResponse toItemResponse(CartItem item) {
        BigDecimal subTotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

        return new CartItemResponse(
                item.getId(),
                item.getProductId(),
                item.getProductName(),
                item.getQuantity(),
                item.getUnitPrice(),
                subTotal
        );
    }
}