package com.swiftcart.cart_service.controller;

import com.swiftcart.cart_service.dtos.AddToCartRequest;
import com.swiftcart.cart_service.dtos.CartResponse;
import com.swiftcart.cart_service.response.ApiResponse;
import com.swiftcart.cart_service.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Get a user's cart
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<CartResponse>> getCart(@PathVariable Long userId) {
        CartResponse cartResponse = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(
                new ApiResponse<>("Cart retrieved successfully", cartResponse)
        );
    }

    // Add an item to the cart
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartResponse>> addItemToCart(@RequestBody AddToCartRequest request) {
        CartResponse cartResponse = cartService.addItemToCart(request);
        return new ResponseEntity<>(
                new ApiResponse<>("Item added to cart successfully", cartResponse),
                HttpStatus.OK
        );
    }

    // Clear the entire cart
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(
                new ApiResponse<>("Cart cleared successfully", null)
        );
    }
}