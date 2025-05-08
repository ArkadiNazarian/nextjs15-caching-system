'use client';

import { useState } from 'react';

export default function Home() {
  const [volume, setVolume] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setVolume(null);
    setWeight(null);
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/stl', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Unknown error');
      } 

      const data = await res.json();
      setVolume(data.volumeCm3);
      setWeight(data.weightGrams);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">STL Volume & Weight Calculator</h1>

      <input
        type="file"
        accept=".stl"
        onChange={handleUpload}
        className="mb-4"
      />

      {loading && <p>Processing STL...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {volume && weight && (
        <div className="mt-4 p-4 border rounded shadow">
          <p><strong>Volume:</strong> {volume} cm³</p>
          <p><strong>Weight (PLA):</strong> {weight} g</p>
        </div>
      )}
    </main>
  );
}
