package com.swiftcart.cart_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId; // Connects to Identity Service (User ID)

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    private BigDecimal totalCartValue = BigDecimal.ZERO; // Sum of all item totalPrices

    public Cart() {
    }

    public Cart(Long id, Long userId) {
        this.id = id;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public BigDecimal getTotalCartValue() {
        return totalCartValue;
    }

    public void setTotalCartValue(BigDecimal totalCartValue) {
        this.totalCartValue = totalCartValue;
    }

    public void calculateTotalCartValue() {
        this.totalCartValue = items.stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void addItem(CartItem item) {
        items.add(item);
        calculateTotalCartValue();
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        calculateTotalCartValue();
    }
}
