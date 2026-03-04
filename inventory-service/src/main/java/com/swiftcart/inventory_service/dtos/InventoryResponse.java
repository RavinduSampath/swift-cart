package com.swiftcart.inventory_service.dtos;

public record InventoryResponse(
        Long productId,
        Integer quantity,
        boolean inStock
) {}