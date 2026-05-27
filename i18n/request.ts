import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messages = {
  en: () => import("../messages/en.json"),
  de: () => import("../messages/de.json"),
  fr: () => import("../messages/fr.json"),
  it: () => import("../messages/it.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await messages[locale]()).default,
  };
});
