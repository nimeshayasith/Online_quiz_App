package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.model.Question;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;



public interface IQuestionService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long id);

    List<String> getAllSubjects();

    Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException;

    void  deleteQuestion(Long id);

    List<Question> getQuestionsForUser(Integer numOfQuestions, String subject);

    List<Question> getQuestionsByAdmin(Long adminId);

    List<Question> getActiveQuestions();

    List<Question> getQuestionsByDifficulty(String difficultyLevel);

    Question toggleQuestionStatus(Long questionId);

    Long countQuestionsBySubject(String subject);
}
