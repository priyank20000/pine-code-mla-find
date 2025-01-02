import { NextResponse } from 'next/server';
import { getPincodeDetails } from '@/lib/api/postal';
import { generateRepresentativePrompt } from '@/lib/api/gemini';
import { findRepresentativeByPincode, saveRepresentative } from '@/lib/api/services/representative.service';
import { extractAndParseJSON } from '@/lib/utils/parse-json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode');

  if (!pincode) {
    return NextResponse.json(
      { error: 'Please provide a PIN code' },
      { status: 400 }
    );
  }

  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json(
      { error: 'Invalid PIN code format. Please enter a 6-digit number.' },
      { status: 400 }
    );
  }

  try {
    // Check cache first
    const cachedData = await findRepresentativeByPincode(pincode);
    if (cachedData) {
      return NextResponse.json({
        area: cachedData.areaDetails,
        representatives: cachedData.representatives,
        source: 'cache'
      });
    }

    // Fetch new data if not in cache
    const postOffices = await getPincodeDetails(pincode);
    
    if (!postOffices || postOffices.length === 0) {
      return NextResponse.json(
        { error: 'No data found for this PIN code' },
        { status: 404 }
      );
    }

    const mainPostOffice = postOffices[0];
    const representativesData = await generateRepresentativePrompt(mainPostOffice);
    
    try {
      const representatives = extractAndParseJSON(representativesData);
      
      // Save to database
      await saveRepresentative(pincode, mainPostOffice, representatives);
      
      return NextResponse.json({
        area: mainPostOffice,
        representatives,
        source: 'generated'
      });
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Failed to process representative data' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}