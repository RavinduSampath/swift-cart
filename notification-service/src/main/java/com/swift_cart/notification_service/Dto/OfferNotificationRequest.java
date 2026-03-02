package com.swiftcart.notification_service.Dto;

import java.time.LocalDateTime;

public class OfferNotificationRequest {
    private String recipientEmail;
    private String offerTitle;
    private String offerDescription;
    private Double discountPercentage;
    private String productName;
    private LocalDateTime offerExpiryDate;

    // Getters & Setters
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    public String getOfferTitle() { return offerTitle; }
    public void setOfferTitle(String offerTitle) { this.offerTitle = offerTitle; }
    public String getOfferDescription() { return offerDescription; }
    public void setOfferDescription(String offerDescription) { this.offerDescription = offerDescription; }
    public Double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Double discountPercentage) { this.discountPercentage = discountPercentage; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public LocalDateTime getOfferExpiryDate() { return offerExpiryDate; }
    public void setOfferExpiryDate(LocalDateTime offerExpiryDate) { this.offerExpiryDate = offerExpiryDate; }
}