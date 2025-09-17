package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.model.QuizResult;
import com.dailycodework.quizonline.model.Student;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IQuizResultService {

    QuizResult saveQuizResult(QuizResult quizResult);

    List<QuizResult> getQuizResultsByStudent(Student student);

    List<QuizResult> getQuizResultsByStudentId(Long studentId);

    List<QuizResult> getQuizResultsBySubject(String subject);

    Optional<QuizResult> getQuizResultById(Long id);

    List<QuizResult> getQuizResultsByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    Double getAverageScoreBySubject(String subject);

    Long countQuizzesByStudentAndSubject(Student student, String subject);

    List<QuizResult> getAllQuizResults();

    void deleteQuizResult(Long id);

    // Method to create and save quiz result
    QuizResult createQuizResult(Long studentId, String subject, Integer totalQuestions,
                                Integer correctAnswers, Integer timeTakenSeconds);
}