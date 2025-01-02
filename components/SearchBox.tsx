'use client';

import { Search } from 'lucide-react';

interface SearchBoxProps {
  pincode: string;
  setPincode: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
  error?: string;
}

export function SearchBox({ pincode, setPincode, onSearch, loading, error }: SearchBoxProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-lg transition-all">
      <div className="flex gap-4">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter PIN Code (e.g., 400091)"
          className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          maxLength={6}
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          <Search className="h-5 w-5" />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}