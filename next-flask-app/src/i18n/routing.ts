import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "hi", "ta", "te", "kn"],

  // Used when no locale matches
  defaultLocale: "en",
});
