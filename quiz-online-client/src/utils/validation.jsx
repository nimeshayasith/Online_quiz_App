// src/utils/validation.js
import { VALIDATION } from './constants';

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION.EMAIL_PATTERN.test(email)) return 'Please enter a valid email';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

export const validateUsername = (username) => {
  if (!username) return 'Username is required';
  if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
    return `Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters`;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return '';
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`;
  return '';
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!VALIDATION.PHONE_PATTERN.test(phone)) return 'Please enter a valid phone number';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateQuestionData = (questionData) => {
  const errors = {};

  if (!questionData.question?.trim()) {
    errors.question = 'Question text is required';
  }

  if (!questionData.subject?.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!questionData.questionType) {
    errors.questionType = 'Question type is required';
  }

  if (!questionData.choices || questionData.choices.length < 2) {
    errors.choices = 'At least 2 choices are required';
  } else {
    const validChoices = questionData.choices.filter(choice => choice?.trim());
    if (validChoices.length < 2) {
      errors.choices = 'At least 2 valid choices are required';
    }
  }

  if (!questionData.correctAnswers || questionData.correctAnswers.length === 0) {
    errors.correctAnswers = 'At least one correct answer is required';
  }

  return errors;
};

export const validateRegistrationData = (formData) => {
  const errors = {};

  errors.username = validateUsername(formData.username);
  errors.firstName = validateName(formData.firstName, 'First name');
  errors.lastName = validateName(formData.lastName, 'Last name');
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  errors.phoneNumber = validatePhoneNumber(formData.phoneNumber);

  if (!formData.role) {
    errors.role = 'Role selection is required';
  }

  // Admin specific validations
  if (formData.role === 'ADMIN') {
    if (!formData.department?.trim()) {
      errors.department = 'Department is required for admin accounts';
    }
    if (!formData.qualification?.trim()) {
      errors.qualification = 'Qualification is required for admin accounts';
    }
    if (!formData.experienceYears || formData.experienceYears < 0) {
      errors.experienceYears = 'Experience years must be a valid number';
    }
  }

  // Filter out empty errors
  return Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== '')
  );
};

export const validateLoginData = (formData) => {
  const errors = {};

  errors.email = validateEmail(formData.email);
  errors.password = validateRequired(formData.password, 'Password');

  return Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== '')
  );
};