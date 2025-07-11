import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Cache messages to avoid repeated imports
const messageCache = new Map<string, Record<string, unknown>>();

async function getMessages(locale: string) {
  if (messageCache.has(locale)) {
    return messageCache.get(locale);
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    messageCache.set(locale, messages);
    return messages;
  } catch {
    // Fallback to default locale if message file is missing
    console.warn(
      `Messages for locale ${locale} not found, falling back to ${routing.defaultLocale}`
    );
    const fallbackMessages = (
      await import(`../../messages/${routing.defaultLocale}.json`)
    ).default;
    messageCache.set(locale, fallbackMessages);
    return fallbackMessages;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});
