package com.swiftcart.cart_service.client;

import java.util.List;

// This lives in the Cart Service, but only exists to read the Product Service's data
public record ProductResponse(
        Long id,
        String brand,
        String modelName,
        Double price,
        List<String> imageUrls
) {}