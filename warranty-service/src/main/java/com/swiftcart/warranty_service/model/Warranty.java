package com.swiftcart.warranty_service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private Long userId;
    private LocalDate purchaseDate;
    private LocalDate expirationDate;
    private String status; // We will use "ACTIVE" or "EXPIRED"
}