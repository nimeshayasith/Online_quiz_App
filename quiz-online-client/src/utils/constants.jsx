// src/utils/constants.js

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:9192/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
};

// Quiz Configuration
export const QUIZ_CONFIG = {
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 50,
  DEFAULT_QUESTIONS: 10,
  DEFAULT_TIME_LIMIT: 600, // 10 minutes in seconds
  WARNING_TIME: 60, // Show warning when 1 minute left
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
};

// Cybersecurity Subjects
export const SUBJECTS = [
  'Network Security',
  'Ethical Hacking',
  'Cryptography',
  'Incident Response',
  'Risk Management',
  'Malware Analysis',
  'Digital Forensics',
  'Cloud Security',
  'Web Application Security',
  'Mobile Security',
  'IoT Security',
  'Social Engineering'
];

// Question Types
export const QUESTION_TYPES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  QUIZ_PROGRESS: 'quizProgress',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  QUIZ_STEPPER: '/quiz-setup',
  TAKE_QUIZ: '/take-quiz',
  QUIZ_RESULT: '/quiz-result',
  CREATE_QUIZ: '/admin/create-quiz',
  MANAGE_QUIZ: '/admin/manage-quiz',
  STUDENT_HISTORY: '/student/history',
  ABOUT: '/about',
  CONTACT: '/contact'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Theme Configuration
export const THEME = {
  COLORS: {
    PRIMARY: {
      purple: '#8B5CF6',
      cyan: '#06B6D4',
      pink: '#EC4899'
    },
    BACKGROUND: {
      dark: '#0F172A',
      slate: '#1E293B',
      gray: '#374151'
    },
    TEXT: {
      white: '#FFFFFF',
      gray: '#9CA3AF',
      light: '#F3F4F6'
    },
    STATUS: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    }
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px'
  }
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^\+?[\d\s\-\(\)]+$/
};

// Quiz Scoring
export const SCORING = {
  EXCELLENT_THRESHOLD: 90,
  GOOD_THRESHOLD: 70,
  FAIR_THRESHOLD: 50,
  PASSING_SCORE: 60
};

// Time Formats
export const TIME_FORMAT = {
  DISPLAY: 'MM:SS',
  FULL: 'YYYY-MM-DD HH:mm:ss'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTRATION_SUCCESS: 'Account created successfully!',
  QUIZ_SUBMITTED: 'Quiz submitted successfully!',
  QUESTION_CREATED: 'Question created successfully!',
  QUESTION_UPDATED: 'Question updated successfully!',
  QUESTION_DELETED: 'Question deleted successfully!'
};