package com.dailycodework.quizonline.controller;

import com.dailycodework.quizonline.dto.LoginRequestDto;
import com.dailycodework.quizonline.dto.UserRegistrationDto;
import com.dailycodework.quizonline.dto.UserResponseDto;
import com.dailycodework.quizonline.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://online-quiz-app-seven-plum.vercel.app"
})
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            UserResponseDto userResponse = userService.registerUser(registrationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        try {
            UserResponseDto userResponse = userService.loginUser(loginRequest);
            return ResponseEntity.ok(userResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/students")
    public ResponseEntity<List<UserResponseDto>> getAllStudents() {
        List<UserResponseDto> students = userService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/admins")
    public ResponseEntity<List<UserResponseDto>> getAllAdmins() {
        List<UserResponseDto> admins = userService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            return userService.findById(userId)
                    .map(user -> ResponseEntity.ok(new UserResponseDto(user)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving user: " + e.getMessage());
        }
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                        @Valid @RequestBody UserRegistrationDto updateDto) {
        try {
            UserResponseDto updatedUser = userService.updateUser(userId, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Delete failed: " + e.getMessage());
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsernameExists(@RequestParam String userName) {
        boolean exists = userService.existsByUserName(userName);
        return ResponseEntity.ok(exists);
    }

    // Dashboard statistics endpoints
    @GetMapping("/stats/students")
    public ResponseEntity<Long> getTotalStudents() {
        Long totalStudents = userService.getTotalStudents();
        return ResponseEntity.ok(totalStudents);
    }

    @GetMapping("/stats/admins")
    public ResponseEntity<Long> getTotalAdmins() {
        Long totalAdmins = userService.getTotalAdmins();
        return ResponseEntity.ok(totalAdmins);
    }

    @GetMapping("/stats/average-score")
    public ResponseEntity<Double> getOverallAverageScore() {
        Double averageScore = userService.getOverallStudentAverageScore();
        return ResponseEntity.ok(averageScore != null ? averageScore : 0.0);
    }
}