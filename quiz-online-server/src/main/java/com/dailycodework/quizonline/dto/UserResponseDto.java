package com.dailycodework.quizonline.dto;

import com.dailycodework.quizonline.model.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponseDto {

    private Long userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String role;
    private LocalDateTime createdAt;

    // Additional fields for Student
    private Integer totalQuizzesTaken;
    private Integer totalScore;
    private Double averageScore;

    // Additional fields for Admin
    private String department;
    private String qualification;
    private Integer experienceYears;
    private Integer totalQuestionsCreated;

    // Constructor from User entity
    public UserResponseDto(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.role = user.getRole().toString();
        this.createdAt = user.getCreatedAt();
    }

    public UserResponseDto() {}
}