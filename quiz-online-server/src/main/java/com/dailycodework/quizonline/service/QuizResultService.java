package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.model.QuizResult;
import com.dailycodework.quizonline.model.Student;
import com.dailycodework.quizonline.repository.QuizResultRepository;
import com.dailycodework.quizonline.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizResultService implements IQuizResultService {

    private final QuizResultRepository quizResultRepository;
    private final StudentRepository studentRepository;

    @Override
    public QuizResult saveQuizResult(QuizResult quizResult) {
        QuizResult savedResult = quizResultRepository.save(quizResult);

        // Update student statistics
        Student student = quizResult.getStudent();
        student.updateQuizStats(quizResult.getCorrectAnswers(), quizResult.getTotalQuestions());
        studentRepository.save(student);

        return savedResult;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResult> getQuizResultsByStudent(Student student) {
        return quizResultRepository.findByStudentOrderByQuizDateDesc(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResult> getQuizResultsByStudentId(Long studentId) {
        return quizResultRepository.findByStudentId(studentId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResult> getQuizResultsBySubject(String subject) {
        return quizResultRepository.findBySubject(subject);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizResult> getQuizResultById(Long id) {
        return quizResultRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResult> getQuizResultsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return quizResultRepository.findByDateRange(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageScoreBySubject(String subject) {
        return quizResultRepository.getAverageScoreBySubject(subject);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countQuizzesByStudentAndSubject(Student student, String subject) {
        return quizResultRepository.countQuizzesByStudentAndSubject(student, subject);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResult> getAllQuizResults() {
        return quizResultRepository.findAll();
    }

    @Override
    public void deleteQuizResult(Long id) {
        quizResultRepository.deleteById(id);
    }

    @Override
    public QuizResult createQuizResult(Long studentId, String subject, Integer totalQuestions,
                                       Integer correctAnswers, Integer timeTakenSeconds) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        QuizResult quizResult = new QuizResult();
        quizResult.setStudent(student);
        quizResult.setSubject(subject);
        quizResult.setTotalQuestions(totalQuestions);
        quizResult.setCorrectAnswers(correctAnswers);
        quizResult.setTimeTakenSeconds(timeTakenSeconds);

        return saveQuizResult(quizResult);
    }
}