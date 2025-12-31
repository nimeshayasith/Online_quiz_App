package com.dailycodework.quizonline.controller;

import com.dailycodework.quizonline.model.Question;
import com.dailycodework.quizonline.service.IQuestionService;
import com.dailycodework.quizonline.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://online-quiz-app-seven-plum.vercel.app"
})
@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;
    private final QuestionService enhancedQuestionService; // For enhanced methods

    @PostMapping("/create-new-question")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody Question question) {
        try {
            Question createdQuestion = questionService.createQuestion(question);
            return ResponseEntity.status(CREATED).body(createdQuestion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create question: " + e.getMessage());
        }
    }

    @PostMapping("/create-new-question-with-admin")
    public ResponseEntity<?> createQuestionWithAdmin(@Valid @RequestBody Question question,
                                                     @RequestParam Long adminId) {
        try {
            Question createdQuestion = enhancedQuestionService.createQuestionWithAdmin(question, adminId);
            return ResponseEntity.status(CREATED).body(createdQuestion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create question: " + e.getMessage());
        }
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/active-questions")
    public ResponseEntity<List<Question>> getActiveQuestions() {
        List<Question> questions = enhancedQuestionService.getActiveQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            Optional<Question> theQuestion = questionService.getQuestionById(id);
            if (theQuestion.isPresent()) {
                return ResponseEntity.ok(theQuestion.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving question: " + e.getMessage());
        }
    }

    @PutMapping("/question/{id}/update")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id,
                                            @RequestBody Question question) {
        try {
            Question updatedQuestion = questionService.updateQuestion(id, question);
            return ResponseEntity.ok(updatedQuestion);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update question: " + e.getMessage());
        }
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete question: " + e.getMessage());
        }
    }

    @PutMapping("/question/{id}/toggle-status")
    public ResponseEntity<?> toggleQuestionStatus(@PathVariable Long id) {
        try {
            Question updatedQuestion = enhancedQuestionService.toggleQuestionStatus(id);
            return ResponseEntity.ok(updatedQuestion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to toggle question status: " + e.getMessage());
        }
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subjects = questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/admin/{adminId}/questions")
    public ResponseEntity<List<Question>> getQuestionsByAdmin(@PathVariable Long adminId) {
        List<Question> questions = enhancedQuestionService.getQuestionsByAdmin(adminId);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/difficulty/{level}")
    public ResponseEntity<List<Question>> getQuestionsByDifficulty(@PathVariable String level) {
        List<Question> questions = enhancedQuestionService.getQuestionsByDifficulty(level);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/subject/{subject}/count")
    public ResponseEntity<Long> countQuestionsBySubject(@PathVariable String subject) {
        Long count = enhancedQuestionService.countQuestionsBySubject(subject);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions,
            @RequestParam String subject) {

        List<Question> allQuestions = questionService.getQuestionsForUser(numOfQuestions, subject);

        if (allQuestions.isEmpty()) {
            return ResponseEntity.ok(allQuestions);
        }

        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int availableQuestions = Math.min(numOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);

        return ResponseEntity.ok(randomQuestions);
    }

    @GetMapping("/quiz/fetch-questions-by-difficulty")
    public ResponseEntity<List<Question>> getQuestionsForUserByDifficulty(
            @RequestParam Integer numOfQuestions,
            @RequestParam String subject,
            @RequestParam(defaultValue = "BEGINNER") String difficulty) {

        // This would require a new repository method for filtering by subject and difficulty
        List<Question> questions = enhancedQuestionService.getQuestionsByDifficulty(difficulty);

        // Filter by subject
        List<Question> subjectQuestions = questions.stream()
                .filter(q -> q.getSubject().equalsIgnoreCase(subject))
                .toList();

        if (subjectQuestions.isEmpty()) {
            return ResponseEntity.ok(subjectQuestions);
        }

        List<Question> mutableQuestions = new ArrayList<>(subjectQuestions);
        Collections.shuffle(mutableQuestions);

        int availableQuestions = Math.min(numOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);

        return ResponseEntity.ok(randomQuestions);
    }
}