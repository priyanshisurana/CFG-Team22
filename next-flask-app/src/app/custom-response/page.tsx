// ---------- File: app/custom-response/page.tsx ----------
"use client";

import { useState } from "react";

export default function CustomResponsePage() {
  const [response, setResponse] = useState("");
  const [header, setHeader] = useState("");

  const handleCustomResponse = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/custom-response");
      const data = await res.json();
      const customHeader = res.headers.get("X-Custom-Header") || "Not Found";
      setResponse(JSON.stringify(data));
      setHeader(customHeader);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Custom Response Test</h1>
      <p>
        This will fetch a response that includes a custom status code and
        header.
      </p>

      <button
        onClick={handleCustomResponse}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Get Custom Response
      </button>

      <p className="mt-4">Response Body: {response}</p>
      <p>Custom Header: {header}</p>
    </main>
  );
}
