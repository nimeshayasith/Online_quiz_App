package com.dailycodework.quizonline.dto;

import lombok.Data;

import java.util.List;

@Data
public class BulkQuestionUploadDto {
    private int totalQuestions;
    private int successfulUploads;
    private int failedUploads;
    private List<String> errors;
    private List<String> successMessages;
}
