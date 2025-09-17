package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    Optional<Student> findByUserName(String userName);

    @Query("SELECT s FROM Student s ORDER BY s.averageScore DESC")
    List<Student> findTopPerformers();

    @Query("SELECT s FROM Student s WHERE s.totalQuizzesTaken >= :minQuizzes ORDER BY s.averageScore DESC")
    List<Student> findActiveStudents(@Param("minQuizzes") Integer minQuizzes);

    @Query("SELECT AVG(s.averageScore) FROM Student s WHERE s.totalQuizzesTaken > 0")
    Double getOverallAverageScore();
}