"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const t = useTranslations("DownloadPage");

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Trigger download via anchor tag
      const link = document.createElement("a");
      link.href = "http://localhost:5000/api/download/sample";
      link.download = "sample.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
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
        onClick={handleDownload}
        disabled={isDownloading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isDownloading ? t("downloading") : t("downloadButton")}
      </button>
    </main>
  );
}
