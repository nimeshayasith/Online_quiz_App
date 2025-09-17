package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByUserName(String userName);

    @Query("SELECT a FROM Admin a WHERE a.department = :department")
    List<Admin> findByDepartment(@Param("department") String department);

    @Query("SELECT a FROM Admin a ORDER BY a.totalQuestionsCreated DESC")
    List<Admin> findTopQuestionCreators();

    @Query("SELECT SUM(a.totalQuestionsCreated) FROM Admin a")
    Long getTotalQuestionsCreatedByAllAdmins();
}