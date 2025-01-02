export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}

export function extractAndParseJSON(text: string): any {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ParseError('No valid JSON found in response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new ParseError('Failed to parse response data');
  }
}