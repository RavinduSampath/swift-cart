package com.swiftcart.api_gateway.filter;

import com.swiftcart.api_gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {

            // Safely grab the Authorization header (Returns null if it doesn't exist)
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            // Check if the header is missing entirely OR doesn't start with "Bearer "
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // Clean the token by removing the first 7 characters ("Bearer ")
            String token = authHeader.substring(7);

            // Validate the token cryptographically
            try {
                jwtUtil.validateToken(token);
            } catch (Exception e) {
                System.out.println("Invalid access...!");
                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                return exchange.getResponse().setComplete();
            }

            // If valid, let the request pass through to the Product/Cart service
            return chain.filter(exchange);
        });
    }

    public static class Config {
        // Empty class needed by Spring Cloud Gateway
    }
}
