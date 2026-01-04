import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9192/api';

export const api = axios.create({
	baseURL: `${API_BASE_URL}/quizzes`
})

export const createQuestion = async(quizQustion) =>{
  try {
    const response = await api.post("/create-new-question", quizQustion)
    return response.data
  } catch (error) {
    console.error('Error creating question:', error)
    const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Failed to create question';
    throw new Error(message);
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/all-questions")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/question/${id}/update`, question)
    return response.data
  } catch (error) {
    console.error('Error updating question:', error)
    const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Failed to update question';
    throw new Error(message);
  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`)
		return response.data
  } catch (error) {
    console.error('Error fetching question:', error)
    const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Failed to fetch question';
    throw new Error(message);
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`)
		return response.data
  } catch (error) {
    console.error('Error deleting question:', error)
    const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Failed to delete question';
    throw new Error(message);
  }
}

export const uploadQuestionsCSV = async(file, adminId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('adminId', adminId);

    const response = await axios.post(
      `${API_BASE_URL}/bulk-upload/questions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading CSV:', error);
    const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Failed to upload CSV file';
    throw new Error(message);
  }
};

export const downloadCSVTemplate = async() => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/bulk-upload/template`,
      {
        responseType: 'text',
      }
    );
    
    // Create a blob from the CSV text
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'quiz_bulk_upload_template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading template:', error);
    const message = error.response?.data || error.message || 'Failed to download template';
    throw new Error(message);
  }
};