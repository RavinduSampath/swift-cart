package com.swiftcart.review_service.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long productId;
    private Long userId;
    private String userName;
    private String content;
    private int rating;
    private LocalDateTime createdAt;
}