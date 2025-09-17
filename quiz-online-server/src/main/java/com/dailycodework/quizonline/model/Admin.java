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
@Table(name = "admins")
@DiscriminatorValue("ADMIN")
public class Admin extends User {

    @Column(name = "department")
    private String department;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "total_questions_created")
    private Integer totalQuestionsCreated = 0;

    // One-to-many relationship with Question (Admin can create many questions)
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questionsCreated;

    // Constructor
    public Admin(String userName, String firstName, String lastName, String email,
                 String password, String phoneNumber, String department, String qualification,
                 Integer experienceYears) {
        super();
        this.setUserName(userName);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPassword(password);
        this.setPhoneNumber(phoneNumber);
        this.setRole(Role.ADMIN);
        this.department = department;
        this.qualification = qualification;
        this.experienceYears = experienceYears;
    }

    // Method to increment question count
    public void incrementQuestionCount() {
        this.totalQuestionsCreated++;
    }
}