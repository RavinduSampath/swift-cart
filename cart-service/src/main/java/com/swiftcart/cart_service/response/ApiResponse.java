package com.swiftcart.cart_service.response;
import lombok.Data;

// Every single request returns the exact same format.
@Data // automatically generates Getters, Setters, toString(), equals(), and hashCode()
public class ApiResponse<T> {
    private String message; // holds a human-readable status message
    private T data; // hold anything

    public ApiResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    // Shortcut for returning an error with just a message (e.g., "Not Found")
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(message, null);
    }

    // Shortcut for returning an error with a message AND data (e.g., Validation maps)
    public static <T> ApiResponse<T> error(String message, T data) {
        return new ApiResponse<>(message, data);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
