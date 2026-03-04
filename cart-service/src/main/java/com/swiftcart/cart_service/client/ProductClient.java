package com.swiftcart.cart_service.client;

import com.swiftcart.cart_service.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", path = "/products")
public interface ProductClient {

    @GetMapping("/{id}")
    ApiResponse<ProductResponse> getProductById(@PathVariable("id") Long id);
}
