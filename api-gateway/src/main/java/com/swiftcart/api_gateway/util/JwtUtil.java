package com.swiftcart.api_gateway.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {

    // Spring automatically grabs your secret key from application.yml and injects it here.
    @Value("${jwt.secret}")
    private String secret;

    // Validates the given JWT string.
    public void validateToken(final String token) {
        // If the token is expired, corrupted, or faked, this line will immediately throw an Exception
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    // Helper method to convert the String secret into a cryptographic Key object.
    private Key getSignKey() {
        // Decode the Base64 String from the application.yml into raw bytes.
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        // Convert those raw bytes into a secure HMAC cryptographic Key.
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
