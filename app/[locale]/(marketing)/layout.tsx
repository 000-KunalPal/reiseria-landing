import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UtilityStrip } from "./_components/utility-strip";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

export default async function MarketingLayout({ children }: Props) {
  const t = await getTranslations("Navbar");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-[#1a5c38] focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#faf6ee] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c4944a] focus:ring-offset-2"
      >
        {t("skipToContent")}
      </a>
      <UtilityStrip />
      <Navbar />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
