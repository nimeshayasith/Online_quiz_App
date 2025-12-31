-- Quick fix for foreign key constraint issues
-- Run this in MySQL Workbench or command line

USE quiz_online;

-- Show current constraints
SELECT CONSTRAINT_NAME, TABLE_NAME 
FROM information_schema.TABLE_CONSTRAINTS 
WHERE TABLE_SCHEMA = 'quiz_online' 
AND TABLE_NAME IN ('question_choices', 'question_correct_answers');

-- Drop the problematic foreign key constraints
ALTER TABLE question_choices DROP FOREIGN KEY FKifc0cyjdk3ijjhtju0fual7a6;
ALTER TABLE question_correct_answers DROP FOREIGN KEY IF EXISTS FK_question_correct_answers;

-- Recreate with proper CASCADE
ALTER TABLE question_choices 
ADD CONSTRAINT FK_question_choices_question 
FOREIGN KEY (question_id) REFERENCES question(id) 
ON DELETE CASCADE;

ALTER TABLE question_correct_answers 
ADD CONSTRAINT FK_question_correct_answers_question 
FOREIGN KEY (question_id) REFERENCES question(id) 
ON DELETE CASCADE;

-- Verify the new constraints
SHOW CREATE TABLE question_choices;
SHOW CREATE TABLE question_correct_answers;

SELECT 'Foreign keys fixed successfully!' AS Status;
