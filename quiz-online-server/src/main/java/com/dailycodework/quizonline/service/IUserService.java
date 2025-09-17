package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.dto.LoginRequestDto;
import com.dailycodework.quizonline.dto.UserRegistrationDto;
import com.dailycodework.quizonline.dto.UserResponseDto;
import com.dailycodework.quizonline.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    UserResponseDto registerUser(UserRegistrationDto registrationDto);

    UserResponseDto loginUser(LoginRequestDto loginRequest);

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    Optional<User> findById(Long userId);

    List<UserResponseDto> getAllUsers();

    List<UserResponseDto> getAllStudents();

    List<UserResponseDto> getAllAdmins();

    UserResponseDto updateUser(Long userId, UserRegistrationDto updateDto);

    void deleteUser(Long userId);

    boolean existsByEmail(String email);

    boolean existsByUserName(String userName);

    // Dashboard statistics
    Long getTotalStudents();

    Long getTotalAdmins();

    Double getOverallStudentAverageScore();
}