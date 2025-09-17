package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT DISTINCT q.subject FROM Question q WHERE q.isActive = true")
    List<String> findDistinctSubject();

    Page<Question> findBySubject(String subject, Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.subject = :subject AND q.isActive = true")
    Page<Question> findActiveBySubject(@Param("subject") String subject, Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.createdBy.userId = :adminId")
    List<Question> findByCreatedByUserId(@Param("adminId") Long adminId);

    List<Question> findByIsActive(Boolean isActive);

    List<Question> findByDifficultyLevel(String difficultyLevel);

    @Query("SELECT q FROM Question q WHERE q.subject = :subject AND q.difficultyLevel = :difficulty AND q.isActive = true")
    Page<Question> findBySubjectAndDifficultyLevel(@Param("subject") String subject,
                                                   @Param("difficulty") String difficulty,
                                                   Pageable pageable);

    @Query("SELECT COUNT(q) FROM Question q WHERE q.subject = :subject")
    Long countBySubject(@Param("subject") String subject);

    @Query("SELECT COUNT(q) FROM Question q WHERE q.isActive = true")
    Long countActiveQuestions();

    @Query("SELECT COUNT(q) FROM Question q WHERE q.createdBy.userId = :adminId")
    Long countByCreatedByUserId(@Param("adminId") Long adminId);

    @Query("SELECT q FROM Question q WHERE q.isActive = true ORDER BY RAND()")
    Page<Question> findRandomActiveQuestions(Pageable pageable);
}
