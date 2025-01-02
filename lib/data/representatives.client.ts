import type { Representatives } from '../types/representatives';

export class RepresentativeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RepresentativeError';
  }
}

export async function getRepresentativeData(pincode: string): Promise<Representatives> {
  try {
    if (!/^\d{6}$/.test(pincode)) {
      throw new RepresentativeError('Please enter a valid 6-digit PIN code');
    }

    const response = await fetch(`/api/representatives?pincode=${pincode}`);
    const data = await response.json();

    if (!response.ok) {
      throw new RepresentativeError(data.error || 'Failed to fetch data');
    }

    return data.representatives;
  } catch (error) {
    if (error instanceof RepresentativeError) {
      throw error;
    }
    throw new RepresentativeError('An unexpected error occurred. Please try again.');
  }
}