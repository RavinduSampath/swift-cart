package com.swiftcart.review_service.controller;

import com.swiftcart.review_service.dtos.ReviewRequest;
import com.swiftcart.review_service.dtos.ReviewResponse;
import com.swiftcart.review_service.response.ApiResponse;
import com.swiftcart.review_service.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(@RequestBody ReviewRequest request) {
        ReviewResponse savedReview = reviewService.addReview(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Review added successfully", true, savedReview));
    }

    @GetMapping("/product/{watchId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getWatchReviews(@PathVariable Long watchId) {
        List<ReviewResponse> reviews = reviewService.getReviewsForWatch(watchId);
        return ResponseEntity.ok(new ApiResponse<>("Reviews fetched successfully", true, reviews));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateReview(
            @PathVariable Long id,
            @RequestBody ReviewRequest request) {
        ReviewResponse updatedReview = reviewService.updateReview(id, request);
        return ResponseEntity.ok(new ApiResponse<>("Review updated successfully", true, updatedReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(new ApiResponse<>("Review deleted successfully", true, null));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getUserReviews(@PathVariable Long userId) {
        List<ReviewResponse> reviews = reviewService.getReviewsForUser(userId);
        return ResponseEntity.ok(new ApiResponse<>("User reviews fetched successfully", true, reviews));
    }
}