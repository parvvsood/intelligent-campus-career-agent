import { apiClient } from './api';

export const sendChatMessage = async (message, conversationId = null, studentProfile = null) => {
  try {
    const response = await apiClient.post('/chat', {
      message,
      conversation_id: conversationId,
      student_profile: studentProfile,
    });
    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};
