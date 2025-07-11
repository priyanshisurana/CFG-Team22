/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SessionPage() {
  const [username, setUsername] = useState("");
  const [setMsg, setSetMsg] = useState("");
  const [getMsg, setGetMsg] = useState("");
  const t = useTranslations("SessionPage");

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
    } catch (err: any) {
      setGetMsg("Error: " + err.message);
    }
  };

  const handleClearSession = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/session/clear", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setGetMsg(data.message || JSON.stringify(data));
      setSetMsg("");
    } catch (err: any) {
      setGetMsg("Error: " + err.message);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>

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
          {t("setSession")}
        </button>
        <button
          onClick={handleGetSession}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {t("getSession")}
        </button>
        <button
          onClick={handleClearSession}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {t("clearSession")}
        </button>
      </div>

      {setMsg && <p className="mt-2">{t("sessionData", { data: setMsg })}</p>}
      {getMsg && <p>{t("sessionData", { data: getMsg })}</p>}
    </main>
  );
}
