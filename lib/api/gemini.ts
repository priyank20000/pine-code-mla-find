import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PostOffice } from './postal';

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiError';
  }
}

const genAI = new GoogleGenerativeAI('AIzaSyDfZR-ssTFWwwvrryPdMjgKpauRwDGCGvc');

export async function generateRepresentativePrompt(postOffice: PostOffice): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate information about political representatives for:
    Area: ${postOffice.Name}
    District: ${postOffice.District}
    State: ${postOffice.State}

    Return ONLY a JSON object with this exact structure:
    {
      "mla": {
        "name": "Full Name",
        "party": "Political Party",
        "phone": "+91 XXXXXXXXXX",
        "email": "email@domain",
        "constituency": "${postOffice.District} Assembly"
      },
      "mp": {
        "name": "Full Name",
        "party": "Political Party",
        "phone": "+91 XXXXXXXXXX",
        "email": "email@domain",
        "constituency": "${postOffice.District} Parliamentary"
      },
      "corporators": [
        {
          "name": "Full Name",
          "party": "Political Party",
          "phone": "+91 XXXXXXXXXX",
          "email": "email@domain",
          "ward": "${postOffice.Name} Ward A"
        },
        {
          "name": "Full Name",
          "party": "Political Party",
          "phone": "+91 XXXXXXXXXX",
          "email": "email@domain",
          "ward": "${postOffice.Name} Ward B"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new GeminiError('Failed to generate AI response. Please try again.');
  }
}