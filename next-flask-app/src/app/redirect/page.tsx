// ---------- File: app/redirect/page.tsx ----------
'use client';

import { useState } from 'react';

export default function RedirectPage() {
  const [result, setResult] = useState('');

  const handleRedirect = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/redirect-test');
      const data = await res.json();
      setResult(JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResult('Error: ' + err.message);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Redirect API Test</h1>
      <p>This will hit the redirect endpoint which internally forwards to /ping.</p>

      <button
        onClick={handleRedirect}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Trigger Redirect
      </button>

      <p className="mt-4">Final Response: {result}</p>
    </main>
  );
}
