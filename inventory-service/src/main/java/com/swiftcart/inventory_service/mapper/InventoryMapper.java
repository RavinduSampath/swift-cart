package com.swiftcart.inventory_service.mapper;

import com.swiftcart.inventory_service.dtos.InventoryRequest;
import com.swiftcart.inventory_service.dtos.InventoryResponse;
import com.swiftcart.inventory_service.model.Inventory;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public Inventory toEntity(InventoryRequest request) {
        Inventory inventory = new Inventory();
        inventory.setProductId(request.productId());
        inventory.setQuantity(request.quantity());
        return inventory;
    }

    public InventoryResponse toResponse(Inventory inventory) {
        return new InventoryResponse(
                inventory.getProductId(),
                inventory.getQuantity(),
                inventory.getQuantity() > 0
        );
    }
}
