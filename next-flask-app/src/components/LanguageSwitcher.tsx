"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

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

  return (
    <div className="mt-8 pt-4 border-t">
      <h2 className="text-lg font-semibold mb-2">
        Languages / भाषाएं / மொழிகள் / భాషలు / ಭಾಷೆಗಳು
      </h2>
      <div className="flex gap-4 flex-wrap">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={pathname}
            locale={lang.code}
            className={`px-3 py-1 rounded ${lang.bgColor} ${lang.textColor} ${lang.hoverColor} transition-colors`}
          >
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
