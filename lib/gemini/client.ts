import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDfZR-ssTFWwwvrryPdMjgKpauRwDGCGvc';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}