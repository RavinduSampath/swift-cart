package com.swiftcart.identity_service.service;

import com.swiftcart.identity_service.dtos.AuthRequest;
import com.swiftcart.identity_service.dtos.RegisterRequest;
import com.swiftcart.identity_service.exceptions.AuthException;
import com.swiftcart.identity_service.mapper.UserMapper;
import com.swiftcart.identity_service.model.User;
import com.swiftcart.identity_service.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, UserMapper userMapper) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }

    public String saveUser(RegisterRequest request) {
        if (repository.findByName(request.name()).isPresent()) {
            throw new AuthException("Username already exists");
        }

        User credential = userMapper.toEntity(request);
        // Encrypt the password before saving to the database
        credential.setPassword(passwordEncoder.encode(request.password()));
        repository.save(credential);

        return "User registered successfully";
    }

    public String generateToken(AuthRequest request) {
        // Find the user
        User user = repository.findByName(request.username())
                .orElseThrow(() -> new AuthException("Invalid username or password"));

        // Check if the raw password matches the hashed password in the DB
        if (passwordEncoder.matches(request.password(), user.getPassword())) {
            // Generate and return the JWT
            return jwtService.generateToken(request.username());
        } else {
            throw new AuthException("Invalid username or password");
        }
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}
