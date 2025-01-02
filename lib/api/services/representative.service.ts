import { connectToDatabase } from '../database/connect';
import { Representative } from '../database/models/representative';
import type { PostOffice } from '../postal';
import type { Representatives } from '@/lib/types/representatives';

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
    createdAt: new Date() // Explicitly set creation time
  };
  
  return Representative.findOneAndUpdate(
    { pincode },
    data,
    { upsert: true, new: true }
  );
}