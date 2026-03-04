package com.swiftcart.warranty_service.dtos;

import lombok.Data;

@Data
public class WarrantyRequest {
    private Long productId;
    private Long userId;
    private int durationInMonths; // e.g., 12 or 24 months for a watch
}