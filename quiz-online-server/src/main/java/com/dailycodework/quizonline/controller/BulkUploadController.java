package com.dailycodework.quizonline.controller;

import com.dailycodework.quizonline.dto.BulkQuestionUploadDto;
import com.dailycodework.quizonline.service.BulkUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bulk-upload")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class BulkUploadController {

    private final BulkUploadService bulkUploadService;

    @PostMapping("/questions")
    public ResponseEntity<?> uploadQuestions(
            @RequestParam("file") MultipartFile file,
            @RequestParam("adminId") Long adminId) {
        
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a CSV file to upload");
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.endsWith(".csv")) {
            return ResponseEntity.badRequest().body("Only CSV files are allowed");
        }

        try {
            BulkQuestionUploadDto result = bulkUploadService.uploadQuestionsFromCSV(file, adminId);
            
            if (result.getFailedUploads() > 0 && result.getSuccessfulUploads() > 0) {
                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).body(result);
            }
            
            if (result.getSuccessfulUploads() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading questions: " + e.getMessage());
        }
    }

    @GetMapping("/template")
    public ResponseEntity<String> downloadTemplate() {
        StringBuilder csv = new StringBuilder();
        
        // Header row
        csv.append("question,subject,questionType,choices,correctAnswers\n");
        
        // Example 1: Single choice
        csv.append("\"What is the capital of France?\",")
           .append("Geography,")
           .append("single,")
           .append("\"A. Paris;B. London;C. Berlin;D. Madrid\",")
           .append("\"A. Paris\"\n");
        
        // Example 2: Multiple choice
        csv.append("\"Which of the following are programming languages? (Select all that apply)\",")
           .append("Computer Science,")
           .append("multiple,")
           .append("\"A. Java;B. HTML;C. Python;D. CSS;E. JavaScript\",")
           .append("\"A. Java;C. Python;E. JavaScript\"\n");
        
        // Example 3: Math question
        csv.append("\"What is 2 + 2?\",")
           .append("Mathematics,")
           .append("single,")
           .append("\"A. 3;B. 4;C. 5;D. 6\",")
           .append("\"B. 4\"\n");
        
        // Example 4: Science question
        csv.append("\"What is the chemical symbol for water?\",")
           .append("Science,")
           .append("single,")
           .append("\"A. H2O;B. CO2;C. O2;D. N2\",")
           .append("\"A. H2O\"\n");
        
        // Example 5: Multiple correct answers
        csv.append("\"Which of these are primary colors?\",")
           .append("Art,")
           .append("multiple,")
           .append("\"A. Red;B. Green;C. Blue;D. Yellow;E. Purple\",")
           .append("\"A. Red;C. Blue;D. Yellow\"\n");
        
        // Instructions at the bottom
        csv.append("\n");
        csv.append("\"INSTRUCTIONS:\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"1. Keep the header row (first line) unchanged\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"2. Each row represents one question\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"3. Separate choices with semicolons (;)\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"4. For multiple correct answers, separate with semicolons\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"5. Question type: 'single' or 'multiple'\",\"\",\"\",\"\",\"\"\n");
        csv.append("\"6. Delete these instruction rows before uploading\",\"\",\"\",\"\",\"\"\n");
        
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=quiz_bulk_upload_template.csv")
                .header("Content-Type", "text/csv; charset=utf-8")
                .body(csv.toString());
    }
}
