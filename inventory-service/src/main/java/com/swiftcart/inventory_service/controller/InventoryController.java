package com.swiftcart.inventory_service.controller;

import com.swiftcart.inventory_service.dtos.InventoryRequest;
import com.swiftcart.inventory_service.dtos.InventoryResponse;
import com.swiftcart.inventory_service.response.ApiResponse;
import com.swiftcart.inventory_service.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addInventory(@RequestBody InventoryRequest request) {
        InventoryResponse response = service.addInventory(request);
        return new ResponseEntity<>(new ApiResponse("Inventory updated successfully", response), HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse> checkInventory(@PathVariable Long productId) {
        InventoryResponse response = service.checkInventory(productId);
        return ResponseEntity.ok(new ApiResponse("Inventory retrieved successfully", response));
    }

    @PutMapping("/reduce")
    public ResponseEntity<ApiResponse> reduceInventory(@RequestBody InventoryRequest request) {
        InventoryResponse response = service.reduceInventory(request);
        return ResponseEntity.ok(new ApiResponse("Inventory reduced successfully", response));
    }
}
