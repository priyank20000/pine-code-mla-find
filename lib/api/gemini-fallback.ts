import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PostOffice } from './postal';

const genAI = new GoogleGenerativeAI('AIzaSyDfZR-ssTFWwwvrryPdMjgKpauRwDGCGvc');

export async function generateAreaDetails(pincode: string): Promise<PostOffice> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `For the Indian PIN code ${pincode}, generate realistic postal details.
  Return ONLY a JSON object with this structure:
  {
    "Name": "Area name",
    "District": "District name",
    "State": "State name",
    "Region": "Region name",
    "Circle": "Postal circle",
    "Division": "Postal division",
    "Block": "Block name",
    "BranchType": "Head Post Office",
    "DeliveryStatus": "Delivery",
    "Country": "India",
    "Pincode": "${pincode}"
  }

  Make sure the area details are realistic and match Indian geography. Use actual district and state names.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid response format');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new Error('Failed to generate area details');
  }
}