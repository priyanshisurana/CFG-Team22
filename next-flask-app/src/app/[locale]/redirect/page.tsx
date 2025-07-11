"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function RedirectPage() {
  const [result, setResult] = useState("");
  const t = useTranslations("RedirectPage");

  const handleRedirect = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/redirect-test");
      const data = await res.json();
      setResult(JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResult("Error: " + err.message);
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
        onClick={handleRedirect}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        {t("button")}
      </button>

      {result && <p className="mt-4">Final Response: {result}</p>}
    </main>
  );
}
