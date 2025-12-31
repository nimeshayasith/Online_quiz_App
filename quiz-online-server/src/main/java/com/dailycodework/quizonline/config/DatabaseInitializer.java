package com.dailycodework.quizonline.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

/**
 * Database initialization service that runs SQL scripts on application startup.
 * This ensures that all required tables and constraints are properly configured.
 */
@Slf4j
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        log.info("Checking database initialization...");
        
        try {
            // Check if tables exist
            boolean tablesExist = checkTablesExist();
            
            if (!tablesExist) {
                log.info("Tables not found. Running schema initialization...");
                initializeSchema();
            } else {
                log.info("Database tables already exist. Checking constraints...");
                fixForeignKeys();
            }
            
            log.info("Database initialization completed successfully.");
        } catch (Exception e) {
            log.error("Error during database initialization: {}", e.getMessage(), e);
        }
    }

    private boolean checkTablesExist() {
        try {
            Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.TABLES " +
                "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'question'",
                Integer.class
            );
            return count != null && count > 0;
        } catch (Exception e) {
            log.error("Error checking tables: {}", e.getMessage());
            return false;
        }
    }

    private void fixForeignKeys() {
        try {
            // Check if foreign key constraint needs fixing
            log.info("Verifying foreign key constraints...");
            
            // Drop old constraint if exists
            try {
                jdbcTemplate.execute("ALTER TABLE question_choices DROP FOREIGN KEY FKifc0cyjdk3ijjhtju0fual7a6");
                log.info("Dropped old question_choices constraint");
            } catch (Exception e) {
                // Constraint might not exist, that's ok
                log.debug("Old constraint not found or already dropped");
            }
            
            try {
                jdbcTemplate.execute("ALTER TABLE question_correct_answers DROP FOREIGN KEY FK_question_correct_answers");
            } catch (Exception e) {
                log.debug("Old constraint not found or already dropped");
            }
            
            // Add new constraints with CASCADE
            try {
                jdbcTemplate.execute(
                    "ALTER TABLE question_choices " +
                    "ADD CONSTRAINT FK_question_choices_question " +
                    "FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE"
                );
                log.info("Created/updated question_choices foreign key");
            } catch (Exception e) {
                log.debug("question_choices foreign key already exists or error: {}", e.getMessage());
            }
            
            try {
                jdbcTemplate.execute(
                    "ALTER TABLE question_correct_answers " +
                    "ADD CONSTRAINT FK_question_correct_answers_question " +
                    "FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE"
                );
                log.info("Created/updated question_correct_answers foreign key");
            } catch (Exception e) {
                log.debug("question_correct_answers foreign key already exists or error: {}", e.getMessage());
            }
            
        } catch (Exception e) {
            log.error("Error fixing foreign keys: {}", e.getMessage());
        }
    }

    private void initializeSchema() {
        try {
            // Read and execute schema.sql if it exists in resources
            ClassPathResource resource = new ClassPathResource("schema.sql");
            if (resource.exists()) {
                String sql;
                try (BufferedReader reader = new BufferedReader(
                        new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
                    sql = reader.lines().collect(Collectors.joining("\n"));
                }
                
                // Split by semicolon and execute each statement
                String[] statements = sql.split(";");
                for (String statement : statements) {
                    if (!statement.trim().isEmpty() && !statement.trim().startsWith("--")) {
                        jdbcTemplate.execute(statement);
                    }
                }
                log.info("Schema initialized from schema.sql");
            }
        } catch (Exception e) {
            log.warn("Could not initialize from schema.sql: {}", e.getMessage());
            log.info("Relying on Hibernate DDL auto configuration");
        }
    }
}
