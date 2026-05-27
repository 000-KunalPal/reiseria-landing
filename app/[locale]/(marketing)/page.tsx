import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutReiseria } from "./_components/about-reiseria";
import { DestinationCards } from "./_components/destination-cards";
import { FinalCta } from "./_components/final-cta";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { ItineraryPreview } from "./_components/itinerary-preview";
import { TrustSection } from "./_components/trust-section";
import { ParallaxScroll } from "@/components/animted-components/scroll-parallax";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Reiseria | Private India and Oman Travel Planning",
  description:
    "Bespoke India and Oman journeys with thoughtful stays, seamless logistics, and calm concierge planning.",
};

export default async function MarketingHome({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutReiseria />
      <DestinationCards />
      <ItineraryPreview />
      <ParallaxScroll />
      <HowItWorks />
      <TrustSection />
      <FinalCta />
    </main>
  );
}
