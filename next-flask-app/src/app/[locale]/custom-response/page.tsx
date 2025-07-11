"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CustomResponsePage() {
  const [response, setResponse] = useState("");
  const [header, setHeader] = useState("");
  const t = useTranslations("CustomResponsePage");

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
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>

      <button
        onClick={handleCustomResponse}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        {t("button")}
      </button>

      {response && (
        <p className="mt-4">{t("response", { message: response })}</p>
      )}
      {header && <p>Custom Header: {header}</p>}
    </main>
  );
}
