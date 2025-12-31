# Database Directory

This folder contains all database-related SQL scripts for the Quiz Online Application.

## Files

### 1. `schema.sql`
Complete database schema with all tables and relationships.
- Run this for initial setup of a new database
- Creates all tables: users, students, admins, question, question_choices, question_correct_answers, quiz_results

### 2. `fix_database.sql`
Recreates question-related tables from scratch.
- Use this if you need to reset question tables
- **Warning**: This will delete all existing questions!

### 3. `fix_foreign_keys.sql`
Fixes foreign key constraints without dropping tables.
- Use this to fix constraint issues
- Safe to run on existing database with data

## How to Add New Tables

When you need to add a new table to the database:

### Method 1: Automatic (Recommended for Development)
1. Create your entity class in `quiz-online-server/src/main/java/.../model/`
2. Add proper JPA annotations
3. Restart the application
4. The `DatabaseInitializer` service will automatically create the table via Hibernate

### Method 2: Manual SQL
1. Create a new SQL file in this `database/` folder (e.g., `add_new_feature_table.sql`)
2. Write your CREATE TABLE statement
3. Run it in MySQL Workbench or command line:
   ```bash
   mysql -u root -p quiz_online < database/add_new_feature_table.sql
   ```

### Method 3: Using Spring Boot Resources
1. Add your SQL script to `quiz-online-server/src/main/resources/db/migration/`
2. The `DatabaseInitializer` will automatically run it on startup

## Database Configuration

Current configuration in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/quiz_online
spring.datasource.username=root
spring.datasource.password=91513189
spring.jpa.hibernate.ddl-auto=update
```

## Auto-Initialization Features

The application includes a `DatabaseInitializer` service that:
- ✅ Checks if tables exist on startup
- ✅ Automatically fixes foreign key constraints
- ✅ Creates missing tables via Hibernate
- ✅ Logs all database initialization activities

## Common Operations

### View all tables
```sql
SHOW TABLES;
```

### View table structure
```sql
DESCRIBE question;
DESCRIBE users;
```

### View foreign keys
```sql
SELECT 
    CONSTRAINT_NAME, 
    TABLE_NAME, 
    REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'quiz_online' 
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### Backup database
```bash
mysqldump -u root -p quiz_online > database/backup_$(date +%Y%m%d).sql
```

### Restore database
```bash
mysql -u root -p quiz_online < database/backup_file.sql
```

## Best Practices

1. **Always backup before running DROP statements**
2. **Test SQL scripts on a development database first**
3. **Document table changes in this README**
4. **Use transactions for multiple operations**
5. **Keep Hibernate ddl-auto as 'update' in production**

## Troubleshooting

### Foreign Key Constraint Errors
Run `fix_foreign_keys.sql` to reset constraints

### Table doesn't exist
1. Check if Hibernate created it automatically
2. Run `schema.sql` if starting fresh
3. Check application logs for errors

### Connection refused
1. Verify MySQL is running: `mysql -u root -p`
2. Check port 3306 is not blocked
3. Verify credentials in `application.properties`
