"use client";

import { useState } from "react";

export default function PingPage() {
  const [result, setResult] = useState("");

  const handlePing = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ping");
      const data = await res.json();
      setResult(JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResult("Error: " + err);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ping Test</h1>
      <p>Click the button to check if Flask is responding.</p>
      <button
        onClick={handlePing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ping Flask
      </button>
      <p className="mt-4">Response: {result}</p>
    </main>
  );
}
