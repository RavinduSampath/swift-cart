package com.swiftcart.identity_service.controller;

import com.swiftcart.identity_service.dtos.AuthRequest;
import com.swiftcart.identity_service.dtos.RegisterRequest;
import com.swiftcart.identity_service.response.ApiResponse;
import com.swiftcart.identity_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> addNewUser(@RequestBody RegisterRequest request) {
        String result = authService.saveUser(request);
        return ResponseEntity.ok(new ApiResponse("Success", result));
    }

    // Login functionality
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> getToken(@RequestBody AuthRequest request) {
        String token = authService.generateToken(request);
        return ResponseEntity.ok(new ApiResponse("Login successful", token));
    }

    @GetMapping("/validate")
    public ResponseEntity<ApiResponse> validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return ResponseEntity.ok(new ApiResponse("Token is valid", null));
    }
}
