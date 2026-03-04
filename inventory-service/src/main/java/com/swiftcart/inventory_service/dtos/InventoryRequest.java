package com.swiftcart.inventory_service.dtos;

public record InventoryRequest(
        Long productId,
        Integer quantity
) {}