import { connectToDatabase } from '../connect';
import { Representative } from '../models/Representative';
import type { Representatives } from '@/lib/types/representatives';
import type { PostOffice } from '@/lib/api/postal';

export async function findRepresentativeByPincode(pincode: string) {
  await connectToDatabase();
  return Representative.findOne({ pincode });
}

export async function saveRepresentative(
  pincode: string, 
  areaDetails: PostOffice, 
  representatives: Representatives
) {
  await connectToDatabase();
  
  const data = {
    pincode,
    areaDetails,
    representatives,
    lastUpdated: new Date()
  };

  return Representative.findOneAndUpdate(
    { pincode }, 
    data,
    { upsert: true, new: true }
  );
}