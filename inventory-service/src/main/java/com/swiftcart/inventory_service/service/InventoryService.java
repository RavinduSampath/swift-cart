package com.swiftcart.inventory_service.service;

import com.swiftcart.inventory_service.dtos.InventoryRequest;
import com.swiftcart.inventory_service.dtos.InventoryResponse;
import com.swiftcart.inventory_service.exceptions.InsufficientStockException;
import com.swiftcart.inventory_service.exceptions.ResourceNotFoundException;
import com.swiftcart.inventory_service.mapper.InventoryMapper;
import com.swiftcart.inventory_service.model.Inventory;
import com.swiftcart.inventory_service.repository.InventoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository repository;
    private final InventoryMapper mapper;

    public InventoryService(InventoryRepository repository, InventoryMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public InventoryResponse addInventory(InventoryRequest request) {
        Inventory inventory = repository.findByProductId(request.productId())
                .orElseGet(() -> mapper.toEntity(request));

        // If it already exists, just add to the existing quantity
        if (inventory.getId() != null) {
            inventory.setQuantity(inventory.getQuantity() + request.quantity());
        }

        Inventory savedInventory = repository.save(inventory);
        return mapper.toResponse(savedInventory);
    }

    public InventoryResponse checkInventory(Long productId) {
        Inventory inventory = repository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product ID: " + productId));
        return mapper.toResponse(inventory);
    }

    @Transactional
    public InventoryResponse reduceInventory(InventoryRequest request) {
        Inventory inventory = repository.findByProductId(request.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product ID: " + request.productId()));

        if (inventory.getQuantity() < request.quantity()) {
            throw new InsufficientStockException("Not enough stock available for product ID: " + request.productId());
        }

        inventory.setQuantity(inventory.getQuantity() - request.quantity());
        Inventory updatedInventory = repository.save(inventory);
        return mapper.toResponse(updatedInventory);
    }
}
