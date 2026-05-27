import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/components/lenis-provider";
import { CurrencyProvider } from "@/components/currency-context";
import "../globals.css";
import "lenis/dist/lenis.css";

const satoshi = localFont({
  src: [
    {
      path: "../../public/satoshi/Satoshi-Variable.woff2",
      style: "normal",
      weight: "300 900",
    },
    {
      path: "../../public/satoshi/Satoshi-VariableItalic.woff2",
      style: "italic",
      weight: "300 900",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const zodiak = localFont({
  src: [
    {
      path: "../../public/zodiak/Zodiak-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/zodiak/Zodiak-VariableItalic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${satoshi.variable} ${zodiak.variable} h-full bg-background text-foreground antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            <LenisProvider>{children}</LenisProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
