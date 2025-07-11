import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-gray-600">{t("description")}</p>
      <ul className="list-disc ml-4 space-y-2">
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/ping"
            prefetch={true}
          >
            {t("navigation.ping")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/hello"
            prefetch={true}
          >
            {t("navigation.hello")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/tasks"
            prefetch={true}
          >
            {t("navigation.tasks")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/session"
            prefetch={true}
          >
            {t("navigation.session")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/download"
            prefetch={true}
          >
            {t("navigation.download")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/redirect"
            prefetch={true}
          >
            {t("navigation.redirect")}
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href="/custom-response"
            prefetch={true}
          >
            {t("navigation.customResponse")}
          </Link>
        </li>
      </ul>

      <LanguageSwitcher />
    </main>
  );
}
