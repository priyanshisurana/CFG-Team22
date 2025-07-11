"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HelloPage() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const t = useTranslations("HelloPage");

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
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("placeholder")}
        className="border px-3 py-2 rounded w-full max-w-xs"
      />

      <button
        onClick={handleHello}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {t("button")}
      </button>

      {response && (
        <p className="mt-4 font-medium text-lg">
          {t("response", { message: response })}
        </p>
      )}

      <LanguageSwitcher />
    </main>
  );
}
