import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDfZR-ssTFWwwvrryPdMjgKpauRwDGCGvc');

export async function getRepresentativesByPincode(pincode: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a JSON API that returns information about Indian political representatives. For the PIN code ${pincode}, return ONLY a JSON object (no other text) with information about the local representatives. The JSON must exactly follow this structure:
  {
    "mla": {
      "name": "Full Name",
      "party": "Political Party",
      "phone": "Phone Number",
      "email": "Email Address",
      "constituency": "Constituency Name"
    },
    "mp": {
      "name": "Full Name",
      "party": "Political Party",
      "phone": "Phone Number",
      "email": "Email Address",
      "constituency": "Constituency Name"
    },
    "corporators": [{
      "name": "Full Name",
      "party": "Political Party",
      "phone": "Phone Number",
      "email": "Email Address",
      "ward": "Ward Number/Name"
    }]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Ensure we're only parsing the JSON part
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonStr = text.slice(jsonStart, jsonEnd);

    try {
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Received text:', text);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to fetch representative data. Please try again.');
  }
}