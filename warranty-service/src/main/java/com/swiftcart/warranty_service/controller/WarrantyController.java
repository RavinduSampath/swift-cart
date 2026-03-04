package com.swiftcart.warranty_service.controller;

import com.swiftcart.warranty_service.dtos.WarrantyRequest;
import com.swiftcart.warranty_service.dtos.WarrantyResponse;
import com.swiftcart.warranty_service.response.ApiResponse;
import com.swiftcart.warranty_service.service.WarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/warranties")
@CrossOrigin(origins = "http://localhost:5173") // Assuming your React app runs on Vite's default port
@RequiredArgsConstructor
public class WarrantyController {

    private final WarrantyService warrantyService;

    @PostMapping
    public ResponseEntity<ApiResponse<WarrantyResponse>> registerWarranty(@RequestBody WarrantyRequest request) {
        WarrantyResponse response = warrantyService.registerWarranty(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Warranty registered successfully", true, response));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<WarrantyResponse>> getWarrantyStatus(@PathVariable Long productId) {
        WarrantyResponse response = warrantyService.checkWarrantyStatus(productId);
        return ResponseEntity.ok(new ApiResponse<>("Warranty status fetched successfully", true, response));
    }
}