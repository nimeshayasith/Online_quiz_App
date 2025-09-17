// src/services/quizService.js
import api from './api';

export const quizService = {
  // Create new question
  async createQuestion(questionData) {
    try {
      const response = await api.post('/quizzes/create-new-question', questionData);
      return response.data;
    } catch (error) {
      const message = error.response?.data || 'Failed to create question';
      throw new Error(message);
    }
  },

  // Create question with admin association
  async createQuestionWithAdmin(questionData, adminId) {
    try {
      const response = await api.post(
        `/quizzes/create-new-question-with-admin?adminId=${adminId}`, 
        questionData
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data || 'Failed to create question';
      throw new Error(message);
    }
  },

  // Get all questions
  async getAllQuestions() {
    try {
      const response = await api.get('/quizzes/all-questions');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch questions');
    }
  },

  // Get active questions only
  async getActiveQuestions() {
    try {
      const response = await api.get('/quizzes/active-questions');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch active questions');
    }
  },

  // Get question by ID
  async getQuestionById(id) {
    try {
      const response = await api.get(`/quizzes/question/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch question');
    }
  },

  // Update question
  async updateQuestion(id, questionData) {
    try {
      const response = await api.put(`/quizzes/question/${id}/update`, questionData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update question');
    }
  },

  // Delete question
  async deleteQuestion(id) {
    try {
      await api.delete(`/quizzes/question/${id}/delete`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete question');
    }
  },

  // Toggle question status
  async toggleQuestionStatus(id) {
    try {
      const response = await api.put(`/quizzes/question/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to toggle question status');
    }
  },

  // Get all subjects
  async getSubjects() {
    try {
      const response = await api.get('/quizzes/subjects');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch subjects');
    }
  },

  // Get questions for quiz (randomized)
  async getQuestionsForUser(numOfQuestions, subject) {
    try {
      const response = await api.get(
        `/quizzes/quiz/fetch-questions-for-user?numOfQuestions=${numOfQuestions}&subject=${encodeURIComponent(subject)}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch quiz questions');
    }
  },

  // Get questions by difficulty
  async getQuestionsByDifficulty(numOfQuestions, subject, difficulty = 'BEGINNER') {
    try {
      const response = await api.get(
        `/quizzes/quiz/fetch-questions-by-difficulty?numOfQuestions=${numOfQuestions}&subject=${encodeURIComponent(subject)}&difficulty=${difficulty}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch questions by difficulty');
    }
  },

  // Get questions created by specific admin
  async getQuestionsByAdmin(adminId) {
    try {
      const response = await api.get(`/quizzes/admin/${adminId}/questions`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch admin questions');
    }
  },

  // Count questions by subject
  async countQuestionsBySubject(subject) {
    try {
      const response = await api.get(`/quizzes/subject/${encodeURIComponent(subject)}/count`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to count questions');
    }
  }
};

// Quiz Result Service
export const quizResultService = {
  // Submit quiz result
  async submitQuizResult(studentId, subject, totalQuestions, correctAnswers, timeTakenSeconds) {
    try {
      const response = await api.post(
        `/quiz-results/submit?studentId=${studentId}&subject=${encodeURIComponent(subject)}&totalQuestions=${totalQuestions}&correctAnswers=${correctAnswers}&timeTakenSeconds=${timeTakenSeconds}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit quiz result');
    }
  },

  // Get quiz results by student
  async getQuizResultsByStudent(studentId) {
    try {
      const response = await api.get(`/quiz-results/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch student quiz results');
    }
  },

  // Get quiz results by subject
  async getQuizResultsBySubject(subject) {
    try {
      const response = await api.get(`/quiz-results/subject/${encodeURIComponent(subject)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch subject quiz results');
    }
  },

  // Get all quiz results (admin only)
  async getAllQuizResults() {
    try {
      const response = await api.get('/quiz-results/all');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch quiz results');
    }
  },

  // Get average score by subject
  async getAverageScoreBySubject(subject) {
    try {
      const response = await api.get(`/quiz-results/average-score/${encodeURIComponent(subject)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch average score');
    }
  },

  // Get quiz result by ID
  async getQuizResultById(id) {
    try {
      const response = await api.get(`/quiz-results/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch quiz result');
    }
  },

  // Delete quiz result
  async deleteQuizResult(id) {
    try {
      await api.delete(`/quiz-results/${id}`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete quiz result');
    }
  }
};

// Statistics Service
export const statsService = {
  // Get total students count
  async getTotalStudents() {
    try {
      const response = await api.get('/auth/stats/students');
      return response.data;
    } catch (error) {
      return 0;
    }
  },

  // Get total admins count
  async getTotalAdmins() {
    try {
      const response = await api.get('/auth/stats/admins');
      return response.data;
    } catch (error) {
      return 0;
    }
  },

  // Get overall average score
  async getOverallAverageScore() {
    try {
      const response = await api.get('/auth/stats/average-score');
      return response.data;
    } catch (error) {
      return 0;
    }
  }
};