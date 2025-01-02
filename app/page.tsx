'use client';

import { useState } from 'react';
import { SearchBox } from '@/components/SearchBox';
import { RepresentativeCard } from '@/components/RepresentativeCard';
import { getRepresentativeData } from '@/lib/data/representatives.client';
import type { Representatives } from '@/lib/types/representatives';

export default function Home() {
  const [pincode, setPincode] = useState('');
  const [representatives, setRepresentatives] = useState<Representatives | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    setLoading(true);
    setError('');
    setRepresentatives(null);

    try {
      const data = await getRepresentativeData(pincode);
      setRepresentatives(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data. Please try again.');
      setRepresentatives(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (type: 'mla' | 'mp' | 'corporators', index: number, updatedData: any) => {
    if (!representatives) return;

    const newRepresentatives = { ...representatives };
    
    if (type === 'corporators') {
      newRepresentatives.corporators[index] = updatedData;
    } else {
      newRepresentatives[type] = updatedData;
    }

    setRepresentatives(newRepresentatives);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          Find Your Representatives
        </h1>
        <p className="text-center mb-12 opacity-70">
          Enter your PIN code to discover your local political representatives
        </p>
        
        <SearchBox
          pincode={pincode}
          setPincode={setPincode}
          onSearch={handleSearch}
          loading={loading}
          error={error}
        />

        {representatives && (
          <div className="space-y-6">
            <RepresentativeCard 
              title="MLA (Member of Legislative Assembly)" 
              data={representatives.mla}
              onUpdate={(data) => handleUpdate('mla', 0, data)}
            />
            <RepresentativeCard 
              title="MP (Member of Parliament)" 
              data={representatives.mp}
              onUpdate={(data) => handleUpdate('mp', 0, data)}
            />
            {representatives.corporators.map((corporator, index) => (
              <RepresentativeCard
                key={index}
                title="Municipal Corporation Member"
                data={corporator}
                onUpdate={(data) => handleUpdate('corporators', index, data)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}