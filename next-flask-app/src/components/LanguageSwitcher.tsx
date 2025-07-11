"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useMemo, memo } from "react";

// Move languages outside component to prevent recreating on each render
const languages = [
  {
    code: "en",
    name: "English",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    hoverColor: "hover:bg-blue-200",
  },
  {
    code: "hi",
    name: "हिंदी",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    hoverColor: "hover:bg-green-200",
  },
  {
    code: "ta",
    name: "தமிழ்",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    hoverColor: "hover:bg-red-200",
  },
  {
    code: "te",
    name: "తెలుగు",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    hoverColor: "hover:bg-purple-200",
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
    hoverColor: "hover:bg-orange-200",
  },
];

function LanguageSwitcher() {
  const pathname = usePathname();

  // Memoize the rendered languages to prevent unnecessary re-renders
  const renderedLanguages = useMemo(() => {
    return languages.map((lang) => (
      <Link
        key={lang.code}
        href={pathname}
        locale={lang.code}
        className={`px-3 py-1 rounded transition-colors ${lang.bgColor} ${lang.textColor} ${lang.hoverColor}`}
      >
        {lang.name}
      </Link>
    ));
  }, [pathname]);

  return (
    <div className="mt-8 pt-4 border-t">
      <h2 className="text-lg font-semibold mb-2">
        Languages / भाषाएं / மொழிகள் / భాషలు / ಭಾಷೆಗಳು
      </h2>
      <div className="flex gap-4 flex-wrap">
        {renderedLanguages}
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(LanguageSwitcher);
