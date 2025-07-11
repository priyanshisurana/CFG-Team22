"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PingPage() {
  const [result, setResult] = useState("");
  const t = useTranslations("PingPage");

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
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
      <button
        onClick={handlePing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t("button")}
      </button>
      {result && <p className="mt-4">{t("response", { message: result })}</p>}
    </main>
  );
}
