// src/utils/helpers.js
import { SCORING } from './constants';

// Format time from seconds to MM:SS
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format datetime for display
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate score percentage
export const calculateScorePercentage = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

// Get score level based on percentage
export const getScoreLevel = (percentage) => {
  if (percentage >= SCORING.EXCELLENT_THRESHOLD) return 'excellent';
  if (percentage >= SCORING.GOOD_THRESHOLD) return 'good';
  if (percentage >= SCORING.FAIR_THRESHOLD) return 'fair';
  return 'needs-improvement';
};

// Get score message
export const getScoreMessage = (percentage) => {
  const level = getScoreLevel(percentage);
  
  const messages = {
    excellent: 'Outstanding performance! You have mastered this topic.',
    good: 'Great job! You have a solid understanding of the material.',
    fair: 'Good effort! Consider reviewing some topics for improvement.',
    'needs-improvement': 'Keep studying! Review the material and try again.'
  };

  return messages[level];
};

// Get score color class
export const getScoreColorClass = (percentage) => {
  const level = getScoreLevel(percentage);
  
  const colorClasses = {
    excellent: 'text-green-400',
    good: 'text-blue-400',
    fair: 'text-yellow-400',
    'needs-improvement': 'text-red-400'
  };

  return colorClasses[level];
};

// Shuffle array (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(deepClone);
  if (typeof obj === 'object') {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
};

// Check if object is empty
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

// Generate avatar initials
export const getInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0).toUpperCase() || '';
  const last = lastName?.charAt(0).toUpperCase() || '';
  return first + last;
};

// Calculate time taken in human readable format
export const getTimeTakenText = (seconds) => {
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 
      ? `${minutes} minutes ${remainingSeconds} seconds`
      : `${minutes} minutes`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0
      ? `${hours} hours ${minutes} minutes`
      : `${hours} hours`;
  }
};

// Validate question answers
export const validateQuizAnswers = (questions, selectedAnswers) => {
  let correctCount = 0;
  
  questions.forEach(question => {
    const userAnswers = selectedAnswers[question.id] || [];
    const correctAnswers = question.correctAnswers || [];
    
    // Convert to comparable format
    const userAnswersSet = new Set(
      Array.isArray(userAnswers) 
        ? userAnswers.map(ans => ans.toString().toUpperCase())
        : [userAnswers.toString().toUpperCase()]
    );
    
    const correctAnswersSet = new Set(
      correctAnswers.map(ans => ans.toString().toUpperCase())
    );
    
    // Check if sets are equal
    if (userAnswersSet.size === correctAnswersSet.size &&
        [...userAnswersSet].every(ans => correctAnswersSet.has(ans))) {
      correctCount++;
    }
  });
  
  return correctCount;
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Get random elements from array
export const getRandomElements = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

// Check if string contains only letters
export const isAlphabetic = (str) => {
  return /^[a-zA-Z\s]+$/.test(str);
};

// Check if string contains only numbers
export const isNumeric = (str) => {
  return /^[0-9]+$/.test(str);
};

// Get difficulty color class
export const getDifficultyColor = (difficulty) => {
  const colors = {
    BEGINNER: 'text-green-400 bg-green-400/20 border-green-400/30',
    INTERMEDIATE: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
    ADVANCED: 'text-red-400 bg-red-400/20 border-red-400/30'
  };
  
  return colors[difficulty] || colors.BEGINNER;
};

// Local storage helpers with error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
      return false;
    }
  }
};