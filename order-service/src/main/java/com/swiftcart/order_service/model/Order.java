package com.swiftcart.order_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;           // e.g., Rolex, Casio
    private String modelName;       // e.g., Submariner
    private String referenceNumber; // e.g., 126610LN
    private String movementType;    // Automatic, Quartz, Manual
    private Integer caseSizeMm;     // 40, 42
    private String caseMaterial;    // Stainless Steel, Gold
    private String strapMaterial;   // Leather, Rubber
    private Double price;

    @ElementCollection
    @CollectionTable(name="product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();
}

