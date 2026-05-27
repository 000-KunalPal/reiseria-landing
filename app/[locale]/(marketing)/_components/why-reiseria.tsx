"use client";

import { Smile, Users, Star, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function WhyReiseria() {
  const t = useTranslations("WhyReiseria");

  const cards = [
    {
      icon: Smile,
      title: t("card1Title"),
      description: t("card1Desc"),
      className: "bg-[#e8c4ab]",
      titleClass: "text-[#0d2b1a]",
      descClass: "text-[#0d2b1a]/70",
      iconClass: "text-[#1a5c38]",
    },
    {
      icon: Users,
      title: t("card2Title"),
      description: t("card2Desc"),
      className: "bg-[#f0e6d2]",
      titleClass: "text-[#0d2b1a]",
      descClass: "text-[#0d2b1a]/70",
      iconClass: "text-[#1a5c38]",
    },
    {
      icon: Star,
      title: t("card3Title"),
      description: t("card3Desc"),
      className: "bg-[#1a5c38]",
      titleClass: "text-[#faf6ee]",
      descClass: "text-[#faf6ee]/85",
      iconClass: "text-[#faf6ee]/80",
    },
    {
      icon: BookOpen,
      title: t("card4Title"),
      description: t("card4Desc"),
      className: "bg-[#0d2b1a]",
      titleClass: "text-[#faf6ee]",
      descClass: "text-[#faf6ee]/85",
      iconClass: "text-[#faf6ee]/80",
    },
  ];

  return (
    <section className="w-full bg-[#d4e2d5] py-16 font-sans sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <h2 className="mx-auto mb-8 max-w-3xl text-center font-serif text-4xl leading-tight font-semibold text-[#0d2b1a] sm:mb-10 md:text-5xl lg:text-6xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({
            icon: Icon,
            title,
            description,
            className,
            titleClass,
            descClass,
            iconClass,
          }) => (
            <article
              key={title}
              className={cn(
                "flex min-h-[260px] flex-col gap-6 rounded-xl p-7 sm:min-h-[340px] sm:gap-8 sm:p-8",
                "transition-all duration-200 ease-out",
                "hover:-translate-y-1 hover:shadow-xl",
                className
              )}
            >
              <Icon
                className={cn("size-8 opacity-80", iconClass)}
                strokeWidth={1.5}
              />
              <h3
                className={cn(
                  "font-serif text-[1.45rem] font-semibold leading-tight sm:text-xl sm:leading-snug lg:text-2xl",
                  titleClass
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "font-sans text-[0.96rem] leading-7 sm:mt-auto sm:text-sm sm:leading-relaxed",
                  descClass
                )}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
