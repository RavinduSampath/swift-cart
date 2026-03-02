package com.swiftcart.review_service.dtos;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long productId;
    private Long userId;
    private String userName;
    private String content;
    private int rating;
}