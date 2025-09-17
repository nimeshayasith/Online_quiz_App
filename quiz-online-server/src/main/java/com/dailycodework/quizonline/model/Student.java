package com.dailycodework.quizonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "students")
@DiscriminatorValue("STUDENT")
public class Student extends User {

    @Column(name = "total_quizzes_taken")
    private Integer totalQuizzesTaken = 0;

    @Column(name = "total_score")
    private Integer totalScore = 0;

    @Column(name = "average_score")
    private Double averageScore = 0.0;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizResult> quizResults;

    // Constructor
    public Student(String userName, String firstName, String lastName, String email,
                   String password, String phoneNumber) {
        super();
        this.setUserName(userName);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPassword(password);
        this.setPhoneNumber(phoneNumber);
        this.setRole(Role.STUDENT);
    }

    // Method to update quiz statistics
    public void updateQuizStats(int score, int totalQuestions) {
        this.totalQuizzesTaken++;
        this.totalScore += score;
        this.averageScore = (double) this.totalScore / (this.totalQuizzesTaken * totalQuestions) * 100;
    }
}