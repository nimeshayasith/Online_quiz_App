package com.dailycodework.quizonline.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "user_id")
    private Student student;

    @Column(name = "subject")
    private String subject;

    @Column(name = "total_questions")
    private Integer totalQuestions;

    @Column(name = "correct_answers")
    private Integer correctAnswers;

    @Column(name = "score_percentage")
    private Double scorePercentage;

    @Column(name = "time_taken_seconds")
    private Integer timeTakenSeconds;

    @Column(name = "quiz_date")
    private LocalDateTime quizDate;

    @PrePersist
    protected void onCreate() {
        quizDate = LocalDateTime.now();
        if (totalQuestions != null && correctAnswers != null) {
            scorePercentage = (double) correctAnswers / totalQuestions * 100;
        }
    }
}