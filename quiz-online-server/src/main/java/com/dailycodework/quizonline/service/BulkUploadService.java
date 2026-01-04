package com.dailycodework.quizonline.service;

import com.dailycodework.quizonline.dto.BulkQuestionUploadDto;
import com.dailycodework.quizonline.model.Admin;
import com.dailycodework.quizonline.model.Question;
import com.dailycodework.quizonline.repository.AdminRepository;
import com.dailycodework.quizonline.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BulkUploadService {

    private final QuestionRepository questionRepository;
    private final AdminRepository adminRepository;

    // Flexible header mappings - allows variations
    private static final Map<String, List<String>> HEADER_VARIATIONS = Map.of(
        "question", Arrays.asList("question", "questiontext", "question_text", "quiz_question", "q"),
        "subject", Arrays.asList("subject", "category", "topic", "subject_name", "course"),
        "questionType", Arrays.asList("questiontype", "question_type", "type", "quiz_type", "qtype"),
        "choices", Arrays.asList("choices", "options", "answers", "answer_choices", "choices_list"),
        "correctAnswers", Arrays.asList("correctanswers", "correct_answers", "correct", "answer", "solution")
    );

    @Transactional
    @SuppressWarnings("null")
    public BulkQuestionUploadDto uploadQuestionsFromCSV(MultipartFile file, Long adminId) {
        BulkQuestionUploadDto result = new BulkQuestionUploadDto();
        result.setErrors(new ArrayList<>());
        result.setSuccessMessages(new ArrayList<>());
        
        int successCount = 0;
        int failCount = 0;
        int lineNumber = 1;

        try {
            // Fetch admin
            Admin admin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + adminId));

            // Parse CSV with flexible headers
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
            
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                    .withFirstRecordAsHeader()
                    .withIgnoreHeaderCase()
                    .withTrim()
                    .withIgnoreSurroundingSpaces());

            // Get headers and normalize them
            Map<String, String> headerMap = normalizeHeaders(csvParser.getHeaderMap());
            
            // Validate required headers exist
            List<String> missingHeaders = validateHeaders(headerMap);
            if (!missingHeaders.isEmpty()) {
                result.getErrors().add("Missing required columns: " + String.join(", ", missingHeaders));
                result.getErrors().add("Available columns: " + String.join(", ", csvParser.getHeaderMap().keySet()));
                result.setTotalQuestions(0);
                result.setSuccessfulUploads(0);
                result.setFailedUploads(0);
                csvParser.close();
                reader.close();
                return result;
            }

            for (CSVRecord record : csvParser) {
                lineNumber++;
                try {
                    // Extract values using normalized headers
                    String questionText = getRecordValue(record, headerMap, "question");
                    String subject = getRecordValue(record, headerMap, "subject");
                    String questionType = getRecordValue(record, headerMap, "questionType");
                    String choicesStr = getRecordValue(record, headerMap, "choices");
                    String correctAnswersStr = getRecordValue(record, headerMap, "correctAnswers");

                    // Validate question text
                    if (questionText == null || questionText.trim().isEmpty()) {
                        result.getErrors().add("Line " + lineNumber + ": Question text is empty");
                        failCount++;
                        continue;
                    }

                    // Validate and normalize question type
                    questionType = normalizeQuestionType(questionType);
                    if (questionType == null) {
                        result.getErrors().add("Line " + lineNumber + ": Invalid question type. Must be 'single' or 'multiple'");
                        failCount++;
                        continue;
                    }

                    // Parse choices (supports multiple separators: semicolon, pipe, comma in quotes)
                    List<String> choices = parseChoices(choicesStr);
                    
                    if (choices.size() < 2) {
                        result.getErrors().add("Line " + lineNumber + ": At least 2 choices are required (found " + choices.size() + ")");
                        failCount++;
                        continue;
                    }

                    // Parse correct answers
                    List<String> correctAnswers = parseChoices(correctAnswersStr);

                    if (correctAnswers.isEmpty()) {
                        result.getErrors().add("Line " + lineNumber + ": At least one correct answer is required");
                        failCount++;
                        continue;
                    }

                    // Validate correct answers exist in choices (case-insensitive)
                    boolean allCorrectAnswersValid = true;
                    for (String correctAnswer : correctAnswers) {
                        boolean found = choices.stream()
                                .anyMatch(choice -> choice.equalsIgnoreCase(correctAnswer.trim()));
                        if (!found) {
                            result.getErrors().add("Line " + lineNumber + ": Correct answer '" + correctAnswer + 
                                    "' not found in choices. Available: " + String.join(", ", choices));
                            allCorrectAnswersValid = false;
                            break;
                        }
                    }

                    if (!allCorrectAnswersValid) {
                        failCount++;
                        continue;
                    }

                    // Normalize correct answers to match exact case from choices
                    List<String> normalizedCorrectAnswers = correctAnswers.stream()
                            .map(ca -> choices.stream()
                                    .filter(choice -> choice.equalsIgnoreCase(ca.trim()))
                                    .findFirst()
                                    .orElse(ca))
                            .collect(Collectors.toList());

                    // Create and save question
                    Question question = new Question();
                    question.setQuestion(questionText.trim());
                    question.setSubject(subject.trim());
                    question.setQuestionType(questionType);
                    question.setChoices(choices);
                    question.setCorrectAnswers(normalizedCorrectAnswers);
                    question.setCreatedBy(admin);
                    question.setIsActive(true);

                    questionRepository.saveAndFlush(question);
                    successCount++;
                    result.getSuccessMessages().add("Line " + lineNumber + ": \"" + 
                            (questionText.length() > 50 ? questionText.substring(0, 47) + "..." : questionText) + 
                            "\" uploaded successfully");

                } catch (Exception e) {
                    log.error("Error processing line {}: {}", lineNumber, e.getMessage());
                    result.getErrors().add("Line " + lineNumber + ": " + e.getMessage());
                    failCount++;
                }
            }

            csvParser.close();
            reader.close();

        } catch (Exception e) {
            log.error("Error reading CSV file: {}", e.getMessage(), e);
            result.getErrors().add("Error reading file: " + e.getMessage());
        }

        result.setTotalQuestions(successCount + failCount);
        result.setSuccessfulUploads(successCount);
        result.setFailedUploads(failCount);

        return result;
    }

    /**
     * Normalize headers to standard field names (case-insensitive, handles variations)
     */
    private Map<String, String> normalizeHeaders(Map<String, Integer> originalHeaders) {
        Map<String, String> normalized = new HashMap<>();
        
        for (String originalHeader : originalHeaders.keySet()) {
            String normalizedKey = findMatchingHeader(originalHeader);
            if (normalizedKey != null) {
                normalized.put(normalizedKey, originalHeader);
            }
        }
        
        return normalized;
    }

    /**
     * Find matching standard header for a given header variation
     */
    private String findMatchingHeader(String header) {
        String cleanHeader = header.toLowerCase().replaceAll("[\\s_-]", "");
        
        for (Map.Entry<String, List<String>> entry : HEADER_VARIATIONS.entrySet()) {
            for (String variation : entry.getValue()) {
                if (cleanHeader.equals(variation.toLowerCase().replaceAll("[\\s_-]", ""))) {
                    return entry.getKey();
                }
            }
        }
        
        return null;
    }

    /**
     * Validate all required headers are present
     */
    private List<String> validateHeaders(Map<String, String> headerMap) {
        List<String> missing = new ArrayList<>();
        for (String required : Arrays.asList("question", "subject", "questionType", "choices", "correctAnswers")) {
            if (!headerMap.containsKey(required)) {
                missing.add(required);
            }
        }
        return missing;
    }

    /**
     * Get value from record using normalized header mapping
     */
    private String getRecordValue(CSVRecord record, Map<String, String> headerMap, String standardKey) {
        String originalHeader = headerMap.get(standardKey);
        if (originalHeader == null) return "";
        return record.get(originalHeader);
    }

    /**
     * Normalize question type to lowercase "single" or "multiple"
     */
    private String normalizeQuestionType(String type) {
        if (type == null) return null;
        String normalized = type.toLowerCase().trim();
        
        // Handle variations
        if (normalized.matches("single|single[-_]?choice|mcq|radio")) {
            return "single";
        } else if (normalized.matches("multiple|multiple[-_]?choice|checkbox|multi")) {
            return "multiple";
        }
        
        return null;
    }

    /**
     * Parse choices/answers from string - supports multiple formats
     */
    private List<String> parseChoices(String input) {
        if (input == null || input.trim().isEmpty()) {
            return new ArrayList<>();
        }

        // Try semicolon first (preferred)
        if (input.contains(";")) {
            return Arrays.stream(input.split(";"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }
        
        // Try pipe separator
        if (input.contains("|")) {
            return Arrays.stream(input.split("\\|"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }
        
        // Try comma (but only if not within quotes)
        if (input.contains(",") && !input.contains("\"")) {
            return Arrays.stream(input.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        // Single value
        return Arrays.asList(input.trim());
    }
}
