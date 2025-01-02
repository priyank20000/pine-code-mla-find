'use client';

import { useState } from 'react';
import { User2, Phone, Mail, Building2, Edit2 } from 'lucide-react';

interface RepresentativeData {
  name: string;
  party: string;
  phone: string;
  email: string;
  constituency?: string;
  ward?: string;
}

interface RepresentativeCardProps {
  title: string;
  data: RepresentativeData;
  onUpdate?: (updatedData: RepresentativeData) => void;
}

export function RepresentativeCard({ title, data, onUpdate }: RepresentativeCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const showEdit = !data.phone || !data.email;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/representatives/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone,
          email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const updatedData = { ...data, phone, email };
        onUpdate?.(updatedData);
        setIsEditing(false);
      } else {
        setError(result.error || 'Failed to update contact details');
      }
    } catch (error) {
      setError('Failed to update contact details');
      console.error('Error updating contact details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-4 shadow-lg transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-border">
        <h3 className="text-xl font-semibold flex items-center gap-3">
          <User2 className="h-6 w-6" />
          {title}
        </h3>
        {showEdit && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="h-4 w-4" />
            Edit Contact
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium opacity-70 mb-1">Name</p>
            <p className="font-medium">{data.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium opacity-70 mb-1">Party</p>
            <p className="font-medium">{data.party}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <Phone className="h-5 w-5 opacity-70" />
          {isEditing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-3 py-1 bg-input border border-border rounded-lg"
              placeholder="Enter phone number"
              disabled={isLoading}
            />
          ) : (
            <p>{phone || 'Not available'}</p>
          )}
        </div>
        <div className="flex items-center gap-3 py-2">
          <Mail className="h-5 w-5 opacity-70" />
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-1 bg-input border border-border rounded-lg"
              placeholder="Enter email address"
              disabled={isLoading}
            />
          ) : (
            <p>{email || 'Not available'}</p>
          )}
        </div>
        <div className="flex items-center gap-3 py-2">
          <Building2 className="h-5 w-5 opacity-70" />
          <p>{data.constituency || data.ward}</p>
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setError('');
                setPhone(data.phone);
                setEmail(data.email);
              }}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-card"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}