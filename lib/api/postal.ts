import { generateAreaDetails } from './gemini-fallback';

export interface PostOffice {
  Name: string;
  Description?: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

interface PinCodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

export class PostalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PostalError';
  }
}

export async function getPincodeDetails(pincode: string): Promise<PostOffice[]> {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

    if (!response.ok) {
      throw new PostalError(`HTTP error! status: ${response.status}`);
    }

    const data: PinCodeResponse[] = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new PostalError('Invalid response format from postal API');
    }

    if (data[0].Status === "Error" || !data[0].PostOffice || data[0].PostOffice.length === 0) {
      // Fallback to Gemini AI for area details
      const generatedDetails = await generateAreaDetails(pincode);
      return [generatedDetails];
    }

    return data[0].PostOffice;
  } catch (error) {
    // Fallback to Gemini AI for area details in case of any error
    try {
      const generatedDetails = await generateAreaDetails(pincode);
      return [generatedDetails];
    } catch (fallbackError) {
      throw new PostalError('Failed to fetch area details. Please try again.');
    }
  }
}