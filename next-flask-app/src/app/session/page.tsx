/* eslint-disable @typescript-eslint/no-explicit-any */
// ---------- File: app/session/page.tsx ----------
"use client";

import { useState } from "react";

export default function SessionPage() {
  const [username, setUsername] = useState("");
  const [setMsg, setSetMsg] = useState("");
  const [getMsg, setGetMsg] = useState("");

  const handleSetSession = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/session/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setSetMsg(data.message || JSON.stringify(data));
    } catch (err: any) {
      setSetMsg("Error: " + err.message);
    }
  };

  const handleGetSession = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/session/get", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setGetMsg(data.username ? `Username: ${data.username}` : data.error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setGetMsg("Error: " + err.message);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Session Management</h1>
      <p>This page sets and retrieves session data using cookies.</p>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="border px-3 py-2 rounded w-full max-w-xs"
      />
      <div className="flex space-x-2 mt-2">
        <button
          onClick={handleSetSession}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Set Session
        </button>
        <button
          onClick={handleGetSession}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Get Session
        </button>
      </div>

      <p className="mt-2">Set Result: {setMsg}</p>
      <p>Get Result: {getMsg}</p>
    </main>
  );
}
