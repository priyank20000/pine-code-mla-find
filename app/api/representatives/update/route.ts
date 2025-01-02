import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/api/database/connect';
import { Representative } from '@/lib/api/database/models/representative';

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    await connectToDatabase();

    // Update MLA
    const mlaUpdate = await Representative.findOneAndUpdate(
      { 'representatives.mla.name': name },
      { $set: { 'representatives.mla.phone': phone, 'representatives.mla.email': email } },
      { new: true }
    );

    if (mlaUpdate) {
      return NextResponse.json({ success: true });
    }

    // Update MP
    const mpUpdate = await Representative.findOneAndUpdate(
      { 'representatives.mp.name': name },
      { $set: { 'representatives.mp.phone': phone, 'representatives.mp.email': email } },
      { new: true }
    );

    if (mpUpdate) {
      return NextResponse.json({ success: true });
    }

    // Update Corporator
    const corporatorUpdate = await Representative.findOneAndUpdate(
      { 'representatives.corporators': { $elemMatch: { name: name } } },
      { $set: { 'representatives.corporators.$.phone': phone, 'representatives.corporators.$.email': email } },
      { new: true }
    );

    if (corporatorUpdate) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Representative not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact details' },
      { status: 500 }
    );
  }
}