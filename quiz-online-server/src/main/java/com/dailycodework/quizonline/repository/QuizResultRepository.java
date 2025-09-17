package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.QuizResult;
import com.dailycodework.quizonline.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByStudent(Student student);

    List<QuizResult> findByStudentOrderByQuizDateDesc(Student student);

    List<QuizResult> findBySubject(String subject);

    @Query("SELECT qr FROM QuizResult qr WHERE qr.student.userId = :studentId ORDER BY qr.quizDate DESC")
    List<QuizResult> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT qr FROM QuizResult qr WHERE qr.quizDate BETWEEN :startDate AND :endDate")
    List<QuizResult> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                     @Param("endDate") LocalDateTime endDate);

    @Query("SELECT AVG(qr.scorePercentage) FROM QuizResult qr WHERE qr.subject = :subject")
    Double getAverageScoreBySubject(@Param("subject") String subject);

    @Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.student = :student AND qr.subject = :subject")
    Long countQuizzesByStudentAndSubject(@Param("student") Student student, @Param("subject") String subject);
}