package com.swiftcart.notification_service.Dto;

public class ProductNotificationRequest {
    private String recipientEmail;
    private String brand;
    private String modelName;
    private String referenceNumber;

    private Double price;

    // Getters & Setters
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }
    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}