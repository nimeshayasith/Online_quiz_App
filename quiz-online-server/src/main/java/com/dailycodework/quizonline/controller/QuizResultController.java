package com.dailycodework.quizonline.controller;

import com.dailycodework.quizonline.model.QuizResult;
import com.dailycodework.quizonline.service.IQuizResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://online-quiz-app-seven-plum.vercel.app"
})
@RestController
@RequestMapping("/api/quiz-results")
@RequiredArgsConstructor
public class QuizResultController {

    private final IQuizResultService quizResultService;

    @PostMapping("/submit")
    public ResponseEntity<QuizResult> submitQuizResult(@RequestParam Long studentId,
                                                       @RequestParam String subject,
                                                       @RequestParam Integer totalQuestions,
                                                       @RequestParam Integer correctAnswers,
                                                       @RequestParam Integer timeTakenSeconds) {
        try {
            QuizResult result = quizResultService.createQuizResult(studentId, subject,
                    totalQuestions, correctAnswers, timeTakenSeconds);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<QuizResult>> getQuizResultsByStudent(@PathVariable Long studentId) {
        List<QuizResult> results = quizResultService.getQuizResultsByStudentId(studentId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<QuizResult>> getQuizResultsBySubject(@PathVariable String subject) {
        List<QuizResult> results = quizResultService.getQuizResultsBySubject(subject);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuizResult>> getAllQuizResults() {
        List<QuizResult> results = quizResultService.getAllQuizResults();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/average-score/{subject}")
    public ResponseEntity<Double> getAverageScoreBySubject(@PathVariable String subject) {
        Double averageScore = quizResultService.getAverageScoreBySubject(subject);
        return ResponseEntity.ok(averageScore != null ? averageScore : 0.0);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResult> getQuizResultById(@PathVariable Long id) {
        return quizResultService.getQuizResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizResult(@PathVariable Long id) {
        quizResultService.deleteQuizResult(id);
        return ResponseEntity.noContent().build();
    }
}