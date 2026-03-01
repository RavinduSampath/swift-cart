package com.swiftcart.identity_service.mapper;

import com.swiftcart.identity_service.dtos.RegisterRequest;
import com.swiftcart.identity_service.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    // Convert DTO to Entity
    public User toEntity(RegisterRequest request) {
        if(request == null) {
            return null;
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());

        return user;
    }
}
