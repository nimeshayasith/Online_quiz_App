// src/hooks/useToast.js
import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000, position = 'top-right') => {
    const id = generateId();
    const newToast = {
      id,
      message,
      type,
      duration,
      position,
      timestamp: Date.now()
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods for different toast types
  const success = useCallback((message, duration, position) => 
    addToast(message, 'success', duration, position), [addToast]);

  const error = useCallback((message, duration, position) => 
    addToast(message, 'error', duration, position), [addToast]);

  const warning = useCallback((message, duration, position) => 
    addToast(message, 'warning', duration, position), [addToast]);

  const info = useCallback((message, duration, position) => 
    addToast(message, 'info', duration, position), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
};