"use client";

import { useState } from "react";

export default function HelloPage() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  const handleHello = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/hello?name=${encodeURIComponent(name)}`
      );
      const data = await res.json();
      setResponse(data.greeting);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Hello API Test</h1>
      <p>Type your name and click the button to get a personalized greeting.</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border px-3 py-2 rounded w-full max-w-xs"
      />

      <button
        onClick={handleHello}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Say Hello
      </button>

      {response && (
        <p className="mt-4 font-medium text-lg">Response: {response}</p>
      )}
    </main>
  );
}
