package com.swiftcart.cart_service.service;

import com.swiftcart.cart_service.client.ProductClient;
import com.swiftcart.cart_service.client.ProductResponse;
import com.swiftcart.cart_service.dtos.AddToCartRequest;
import com.swiftcart.cart_service.dtos.CartResponse;
import com.swiftcart.cart_service.exceptions.ResourceNotFoundException;
import com.swiftcart.cart_service.mapper.CartMapper;
import com.swiftcart.cart_service.model.Cart;
import com.swiftcart.cart_service.model.CartItem;
import com.swiftcart.cart_service.repository.CartRepository;
import com.swiftcart.cart_service.response.ApiResponse;
import feign.FeignException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductClient productClient;
    private final CartMapper cartMapper;

    public CartService(CartRepository cartRepository, ProductClient productClient, CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.productClient = productClient;
        this.cartMapper = cartMapper;
    }

    public CartResponse getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user ID: " + userId));
        return cartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse addItemToCart(AddToCartRequest request) {
        // 1. Fetch or create a cart for the user
        Cart cart = cartRepository.findByUserId(request.userId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(request.userId());
            return newCart;
        });

        // Call Product Service via Feign to verify product and get details
        ProductResponse product;
        try {
            ApiResponse<ProductResponse> response = productClient.getProductById(request.productId());
            product = response.getData();
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Cannot add to cart: Product ID " + request.productId() + " does not exist.");
        }

        // Convert the Double price from Product Service to a BigDecimal
        BigDecimal itemPrice = BigDecimal.valueOf(product.price());

        // Check if the item is already in the cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(request.productId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // If it exists, just increase the quantity
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.quantity());
        } else {
            // If it's new, create a new CartItem
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProductId(product.id());
            newItem.setProductName(product.brand() + " " + product.modelName());
            newItem.setUnitPrice(itemPrice);
            newItem.setQuantity(request.quantity());
            cart.getItems().add(newItem);
        }

        // 4. Recalculate the total cart value
        recalculateTotal(cart);

        // 5. Save and return
        Cart savedCart = cartRepository.save(cart);
        return cartMapper.toResponse(savedCart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user ID: " + userId));

        cart.getItems().clear();
        cart.setTotalCartValue(BigDecimal.ZERO);
        cartRepository.save(cart);
    }

    // Helper method to calculate the total price of all items in the cart
    private void recalculateTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalCartValue(total);
    }
}