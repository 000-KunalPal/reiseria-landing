"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type ExploreCard = {
  name: string;
  image: string;
  alt: string;
};

type ExploreTab = {
  readonly value: "destination" | "traveller" | "month";
  readonly label: string;
  readonly cards: ExploreCard[];
  readonly centered: boolean;
  readonly monthLayout: boolean;
};

type ExploreTabValue = ExploreTab["value"];

function isExploreTabValue(value: string): value is ExploreTabValue {
  return ["destination", "traveller", "month"].includes(value);
}

function ExploreCardItem({
  name,
  image,
  alt,
  compact = false,
}: ExploreCard & {
  compact?: boolean;
}) {
  return (
    <Card className="group h-full overflow-hidden rounded-[30px] border-0 bg-transparent p-0 ring-0 sm:rounded-[28px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-[#d4e2d5] sm:rounded-[28px]">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          src={image}
          alt={alt}
          width={960}
          height={720}
          loading="lazy"
          sizes={
            compact
              ? "(min-width: 1280px) 190px, (min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
              : "(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/35" />
      </div>

      <CardTitle
        className={
          compact
            ? "px-1 pt-4 text-center font-serif text-xl font-semibold text-[#1a5c38]"
            : "px-1 pt-5 text-center font-serif text-2xl font-semibold text-[#1a5c38] md:text-3xl"
        }
      >
        {name}
      </CardTitle>
    </Card>
  );
}

function CardGrid({
  cards,
  centered = false,
  monthLayout = false,
  active = false,
}: {
  cards: ExploreCard[];
  centered?: boolean;
  monthLayout?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={
        monthLayout
          ? "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 xl:grid-cols-6 [&::-webkit-scrollbar]:hidden"
          : centered
            ? "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-4xl sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            : "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      }
      style={{
        contentVisibility: active ? "visible" : "auto",
        containIntrinsicSize: monthLayout ? "1px 420px" : "1px 460px",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.name}
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
            delay: active ? index * 0.012 : 0,
          }}
          className={
            monthLayout
              ? "min-w-[66vw] snap-start sm:min-w-0"
              : "min-w-[84vw] snap-start sm:min-w-0"
          }
        >
          <ExploreCardItem {...card} compact={monthLayout} />
        </motion.div>
      ))}
    </div>
  );
}

function ExplorePanel({
  tab,
  active,
}: {
  tab: ExploreTab;
  active: boolean;
}) {
  return (
    <TabsContent
      value={tab.value}
      forceMount
      className={
        active
          ? "mt-0 block"
          : "pointer-events-none absolute inset-0 mt-0 block"
      }
    >
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!active}
      >
        <CardGrid
          cards={tab.cards}
          centered={tab.centered}
          monthLayout={tab.monthLayout}
          active={active}
        />
      </motion.div>
    </TabsContent>
  );
}

export function DestinationCards() {
  const t = useTranslations("DestinationCards");
  const [activeTab, setActiveTab] = useState<ExploreTabValue>("destination");

  const handleTabChange = (value: string) => {
    if (isExploreTabValue(value)) {
      setActiveTab(value);
    }
  };

  const destinationCards: ExploreCard[] = [
    {
      name: t("india"),
      image: "/about-reiseria/taj-mahal-card.webp",
      alt: t("indiaAlt"),
    },
    {
      name: t("oman"),
      image: "/about-reiseria/oman-card.webp",
      alt: t("omanAlt"),
    },
  ];

  const travellerCards: ExploreCard[] = [
    {
      name: t("familyAdventures"),
      image: "/traveller-type/family-card.webp",
      alt: t("familyAlt"),
    },
    {
      name: t("coupleHolidays"),
      image: "/traveller-type/couple-card.webp",
      alt: t("coupleAlt"),
    },
    {
      name: t("soloAdventures"),
      image: "/traveller-type/solo-card.webp",
      alt: t("soloAlt"),
    },
  ];

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ] as const;

  const monthCards: ExploreCard[] = months.map((name) => ({
    name: t(name),
    image: `/months/${name}-card.webp`,
    alt: t("monthAlt", { month: t(name) }),
  }));

  const exploreTabs: ExploreTab[] = [
    {
      value: "destination",
      label: t("tabDestination"),
      cards: destinationCards,
      centered: true,
      monthLayout: false,
    },
    {
      value: "traveller",
      label: t("tabTraveller"),
      cards: travellerCards,
      centered: false,
      monthLayout: false,
    },
    {
      value: "month",
      label: t("tabMonth"),
      cards: monthCards,
      centered: false,
      monthLayout: true,
    },
  ];

  return (
    <section
      id="destinations"
      className="border-t border-[#1a5c38]/15 bg-[#f0e6d2] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
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

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-12 flex-col items-center gap-9 sm:mt-14 sm:gap-10 lg:mt-16"
        >
          <TabsList className="grid h-14 w-full max-w-[23rem] grid-cols-3 rounded-full bg-[#e4d5be] p-1 text-[#1a5c38] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_46px_rgba(91,62,24,0.08)] sm:h-16 sm:max-w-xl sm:p-1.5">
            {exploreTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-full min-w-0 rounded-full px-2 font-serif text-[0.92rem] leading-none text-[#1a5c38] transition-[background-color,color,box-shadow] duration-300 hover:text-[#1a5c38] focus-visible:text-[#1a5c38] data-[state=active]:bg-[#1a5c38] data-[state=active]:text-[#faf6ee] data-[state=active]:shadow-[0_10px_28px_rgba(26,92,56,0.22)] data-[state=active]:hover:text-[#faf6ee] data-[state=active]:focus-visible:text-[#faf6ee] sm:px-8 sm:text-base"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative min-h-[390px] w-full sm:min-h-[430px] lg:min-h-[390px] xl:min-h-[420px]">
            {exploreTabs.map((tab) => (
              <ExplorePanel
                key={tab.value}
                tab={tab}
                active={activeTab === tab.value}
              />
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}