package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.model.Admin;
import com.dailycodework.quizonline.model.Question;
import com.dailycodework.quizonline.repository.AdminRepository;
import com.dailycodework.quizonline.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService implements IQuestionService {

    private final QuestionRepository questionRepository;
    private final AdminRepository adminRepository;

    @Override
    @Transactional
    public Question createQuestion(Question question) {
        // Ensure the question has default values
        if (question.getIsActive() == null) {
            question.setIsActive(true);
        }
        
        // Save and flush to ensure the question ID is generated before child collections
        Question savedQuestion = questionRepository.saveAndFlush(question);
        return savedQuestion;
    }

    // Enhanced method to create question with admin association
    public Question createQuestionWithAdmin(Question question, Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        question.setCreatedBy(admin);
        Question savedQuestion = questionRepository.save(question);

        // Update admin's question count
        admin.incrementQuestionCount();
        adminRepository.save(admin);

        return savedQuestion;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getAllSubjects() {
        return questionRepository.findDistinctSubject();
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = this.getQuestionById(id);
        if (theQuestion.isPresent()) {
            Question updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestion(question.getQuestion());
            updatedQuestion.setSubject(question.getSubject());
            updatedQuestion.setQuestionType(question.getQuestionType());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
            updatedQuestion.setDifficultyLevel(question.getDifficultyLevel());
            updatedQuestion.setIsActive(question.getIsActive());
            return questionRepository.save(updatedQuestion);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Question> getQuestionsForUser(Integer numOfQuestions, String subject) {
        Pageable pageable = PageRequest.of(0, numOfQuestions);
        return questionRepository.findBySubject(subject, pageable).getContent();
    }

    // Additional methods for enhanced functionality
    @Transactional(readOnly = true)
    public List<Question> getQuestionsByAdmin(Long adminId) {
        return questionRepository.findByCreatedByUserId(adminId);
    }

    @Transactional(readOnly = true)
    public List<Question> getActiveQuestions() {
        return questionRepository.findByIsActive(true);
    }

    @Transactional(readOnly = true)
    public List<Question> getQuestionsByDifficulty(String difficultyLevel) {
        return questionRepository.findByDifficultyLevel(difficultyLevel);
    }

    @Transactional(readOnly = true)
    public Long countQuestionsBySubject(String subject) {
        return questionRepository.countBySubject(subject);
    }

    public Question toggleQuestionStatus(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setIsActive(!question.getIsActive());
        return questionRepository.save(question);
    }
}