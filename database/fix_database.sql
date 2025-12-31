-- Fix Quiz Database Foreign Key Issues
-- Run this in your MySQL database

USE quiz_online;

-- Drop existing tables with foreign key constraints
DROP TABLE IF EXISTS question_correct_answers;
DROP TABLE IF EXISTS question_choices;
DROP TABLE IF EXISTS question;

-- Recreate question table (singular, matching Hibernate default)
CREATE TABLE question (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    created_by BIGINT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    difficulty_level VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create question_choices table
CREATE TABLE question_choices (
    question_id BIGINT NOT NULL,
    choice VARCHAR(500) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create question_correct_answers table
CREATE TABLE question_correct_answers (
    question_id BIGINT NOT NULL,
    correct_answer VARCHAR(100) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verify tables were created
SHOW TABLES LIKE 'question%';
