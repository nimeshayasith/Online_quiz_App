package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.dto.LoginRequestDto;
import com.dailycodework.quizonline.dto.UserRegistrationDto;
import com.dailycodework.quizonline.dto.UserResponseDto;
import com.dailycodework.quizonline.model.Admin;
import com.dailycodework.quizonline.model.Student;
import com.dailycodework.quizonline.model.User;
import com.dailycodework.quizonline.repository.AdminRepository;
import com.dailycodework.quizonline.repository.StudentRepository;
import com.dailycodework.quizonline.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
        // Check if email already exists
        if (existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Check if username already exists
        if (existsByUserName(registrationDto.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        User savedUser;

        if ("STUDENT".equalsIgnoreCase(registrationDto.getRole())) {
            Student student = new Student(
                    registrationDto.getUserName(),
                    registrationDto.getFirstName(),
                    registrationDto.getLastName(),
                    registrationDto.getEmail(),
                    passwordEncoder.encode(registrationDto.getPassword()),
                    registrationDto.getPhoneNumber()
            );
            savedUser = studentRepository.save(student);

        } else if ("ADMIN".equalsIgnoreCase(registrationDto.getRole())) {
            Admin admin = new Admin(
                    registrationDto.getUserName(),
                    registrationDto.getFirstName(),
                    registrationDto.getLastName(),
                    registrationDto.getEmail(),
                    passwordEncoder.encode(registrationDto.getPassword()),
                    registrationDto.getPhoneNumber(),
                    registrationDto.getDepartment(),
                    registrationDto.getQualification(),
                    registrationDto.getExperienceYears()
            );
            savedUser = adminRepository.save(admin);

        } else {
            throw new RuntimeException("Invalid role specified");
        }

        return convertToResponseDto(savedUser);
    }

    @Override
    public UserResponseDto loginUser(LoginRequestDto loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return convertToResponseDto(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override    @SuppressWarnings("null")    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override    @SuppressWarnings("null")    public UserResponseDto updateUser(Long userId, UserRegistrationDto updateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update common fields
        user.setUserName(updateDto.getUserName());
        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());
        user.setEmail(updateDto.getEmail());
        user.setPhoneNumber(updateDto.getPhoneNumber());

        // Update password if provided
        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        }

        // Update role-specific fields
        if (user instanceof Admin && updateDto.getDepartment() != null) {
            Admin admin = (Admin) user;
            admin.setDepartment(updateDto.getDepartment());
            admin.setQualification(updateDto.getQualification());
            admin.setExperienceYears(updateDto.getExperienceYears());
        }

        User savedUser = userRepository.save(user);
        return convertToResponseDto(savedUser);
    }

    @Override
    @SuppressWarnings("null")
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalStudents() {
        return userRepository.countStudents();
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalAdmins() {
        return userRepository.countAdmins();
    }

    @Override
    @Transactional(readOnly = true)
    public Double getOverallStudentAverageScore() {
        return studentRepository.getOverallAverageScore();
    }

    // Helper method to convert User entity to UserResponseDto
    private UserResponseDto convertToResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto(user);

        if (user instanceof Student) {
            Student student = (Student) user;
            dto.setTotalQuizzesTaken(student.getTotalQuizzesTaken());
            dto.setTotalScore(student.getTotalScore());
            dto.setAverageScore(student.getAverageScore());

        } else if (user instanceof Admin) {
            Admin admin = (Admin) user;
            dto.setDepartment(admin.getDepartment());
            dto.setQualification(admin.getQualification());
            dto.setExperienceYears(admin.getExperienceYears());
            dto.setTotalQuestionsCreated(admin.getTotalQuestionsCreated());
        }

        return dto;
    }
}