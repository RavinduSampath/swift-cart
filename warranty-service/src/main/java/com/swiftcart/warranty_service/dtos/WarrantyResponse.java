package com.swiftcart.warranty_service.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class WarrantyResponse {
    private Long id;
    private Long productId;
    private LocalDate purchaseDate;
    private LocalDate expirationDate;
    private String status;
}