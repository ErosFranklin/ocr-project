import axios from 'axios';

export const getLLMResponse = async (prompt) => {
  const response = await axios.post('https://ocr-project-v2gi.onrender.com/openai/completion', { prompt });
  return response.data;
};