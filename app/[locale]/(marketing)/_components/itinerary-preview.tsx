"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/components/currency-context";
import { formatPrice } from "@/lib/currency";

type Itinerary = {
  title: string;
  duration: string;
  destinations: string;
  priceFrom: string;
  summary: string;
  images: {
    src: string;
    alt: string;
  }[];
};

type ItineraryImageStackProps = Pick<Itinerary, "images" | "title"> & {
  t: (key: string) => string;
};

function ItineraryImageStack({
  images,
  title,
  t,
}: ItineraryImageStackProps) {
  return (
    <div className="relative h-72 overflow-hidden rounded-[32px] bg-[#d4e2d5] p-3">
      <div className="grid h-full grid-cols-[1.25fr_0.75fr] gap-3">
        <div className="relative overflow-hidden rounded-[24px]">
          <Image
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src={images[0].src}
            alt={images[0].alt}
            width={640}
            height={640}
            sizes="(min-width: 1024px) 360px, 92vw"
          />
        </div>
        <div className="grid gap-3">
          {images.slice(1).map((image) => (
            <div className="relative overflow-hidden rounded-[22px]" key={image.src}>
              <Image
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                src={image.src}
                alt={image.alt}
                width={320}
                height={270}
                sizes="(min-width: 1024px) 160px, 36vw"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="absolute left-6 top-6 overflow-hidden rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1a5c38] shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:bg-[#faf6ee] group-hover:shadow-[0_12px_28px_rgba(13,43,26,0.22)]">
        <span className="absolute inset-y-0 -left-8 w-6 rotate-12 bg-white/70 blur-[1px] transition-transform duration-700 ease-out group-hover:translate-x-32" />
        <span className="relative">
        {title.includes("+") ? t("dualCountry") : t("signature")}
        </span>
      </p>
    </div>
  );
}

function ItineraryCard({ itinerary, t }: { itinerary: Itinerary; t: (key: string) => string }) {
  return (
    <article className="group flex h-full flex-col rounded-[36px] border border-[#1a5c38]/10 bg-white/80 p-3 shadow-[0_24px_80px_rgba(13,43,26,0.10)] transition duration-300 hover:-translate-y-1 hover:bg-white/90">
      <ItineraryImageStack images={itinerary.images} title={itinerary.title} t={t} />

      <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[#1a5c38]/70">
          <span>{itinerary.duration}</span>
          <span className="text-[#1a5c38]/30">/</span>
          <span>{t("curatedItinerary")}</span>
        </div>

        <h3 className="mt-4 font-serif text-3xl leading-tight font-semibold text-[#0d2b1a]">
          {itinerary.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-[#1a5c38]/10 py-3">
          <p className="max-w-[13rem] text-sm leading-6 text-[#0d2b1a]/64">
            {itinerary.destinations}
          </p>
          <p className="rounded-full bg-[#1a5c38] px-4 py-2 text-right text-sm font-semibold text-[#faf6ee] shadow-[0_12px_28px_rgba(26,92,56,0.18)]">
            {itinerary.priceFrom}
          </p>
        </div>

        <p className="mt-5 text-base leading-7 text-[#0d2b1a]/84">
          {itinerary.summary}
        </p>
      </div>
    </article>
  );
}

export function ItineraryPreview() {
  const t = useTranslations("ItineraryPreview");
  const locale = useLocale();
  const { currency } = useCurrency();

  const itineraries: Itinerary[] = [
    {
      title: t("itinerary1Title"),
      duration: t("itinerary1Duration"),
      destinations: t("itinerary1Destinations"),
      priceFrom: formatPrice(t("itinerary1PriceFrom"), currency, locale),
      summary: t("itinerary1Summary"),
      images: [
        {
          src: "/featured-itineraries/rie1-card.webp",
          alt: t("itinerary1Img0Alt"),
        },
        {
          src: "/featured-itineraries/rie2-card.webp",
          alt: t("itinerary1Img1Alt"),
        },
        {
          src: "/featured-itineraries/rie3-card.webp",
          alt: t("itinerary1Img2Alt"),
        },
      ],
    },
    {
      title: t("itinerary2Title"),
      duration: t("itinerary2Duration"),
      destinations: t("itinerary2Destinations"),
      priceFrom: formatPrice(t("itinerary2PriceFrom"), currency, locale),
      summary: t("itinerary2Summary"),
      images: [
        {
          src: "/featured-itineraries/ola1-card.webp",
          alt: t("itinerary2Img0Alt"),
        },
        {
          src: "/featured-itineraries/ola2-card.webp",
          alt: t("itinerary2Img1Alt"),
        },
        {
          src: "/featured-itineraries/ola3-card.webp",
          alt: t("itinerary2Img2Alt"),
        },
      ],
    },
    {
      title: t("itinerary3Title"),
      duration: t("itinerary3Duration"),
      destinations: t("itinerary3Destinations"),
      priceFrom: formatPrice(t("itinerary3PriceFrom"), currency, locale),
      summary: t("itinerary3Summary"),
      images: [
        {
          src: "/featured-itineraries/io1-card.webp",
          alt: t("itinerary3Img0Alt"),
        },
        {
          src: "/featured-itineraries/io2-card.webp",
          alt: t("itinerary3Img1Alt"),
        },
        {
          src: "/featured-itineraries/io3-card.webp",
          alt: t("itinerary3Img2Alt"),
        },
      ],
    },
  ];

  return (
    <section
      id="itinerary"
      className="bg-[#faf6ee] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#1a5c38]">
            <span className="size-2.5 rounded-full bg-[#1a5c38]" />
            {t("badge")}
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#0d2b1a] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#0d2b1a]/72 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {itineraries.map((itinerary) => (
            <div
              className="min-w-[84vw] snap-center sm:min-w-0"
              key={itinerary.title}
            >
              <ItineraryCard itinerary={itinerary} t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
