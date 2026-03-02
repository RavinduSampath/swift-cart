package com.swiftcart.review_service.service;

import com.swiftcart.review_service.dtos.ReviewRequest;
import com.swiftcart.review_service.dtos.ReviewResponse;
import com.swiftcart.review_service.exceptions.ReviewNotFoundException;
import com.swiftcart.review_service.mapper.ReviewMapper;
import com.swiftcart.review_service.model.Review;
import com.swiftcart.review_service.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Lombok generates a constructor for dependency injection!
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public ReviewResponse addReview(ReviewRequest request) {
        Review review = reviewMapper.toEntity(request);
        Review savedReview = reviewRepository.save(review);
        return reviewMapper.toDto(savedReview);
    }

    public List<ReviewResponse> getReviewsForWatch(Long watchId) {
        return reviewRepository.findByProductId(watchId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }
    public ReviewResponse updateReview(Long id, ReviewRequest request) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with id: " + id));

        // Usually, users can only update the text and the rating
        existingReview.setContent(request.getContent());
        existingReview.setRating(request.getRating());

        Review updatedReview = reviewRepository.save(existingReview);
        return reviewMapper.toDto(updatedReview);
    }
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }
    public List<ReviewResponse> getReviewsForUser(Long userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

}
