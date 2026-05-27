"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { m, useInView } from "motion/react";
import { useRef } from "react";

export function FinalCta() {
  const t = useTranslations("FinalCta");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <m.section
      ref={sectionRef}
      id="final-cta"
      className="relative flex min-h-[720px] w-full items-start justify-center overflow-hidden bg-[#faf6ee] px-5 pt-12 sm:min-h-[780px] sm:px-8 sm:pt-24 lg:min-h-[760px] lg:px-12 lg:pt-28"
    >
      <Image
        src="/cta/cta-cover.webp"
        alt=""
        className="object-cover object-bottom sm:object-center"
        fill
        sizes="100vw"
      />
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#faf6ee] via-[#faf6ee]/92 to-[#faf6ee]/0 sm:h-[42%]" />
      
      <m.div 
        className="relative flex w-full max-w-3xl flex-col items-center text-center text-[#0d2b1a]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="max-w-[18rem] font-serif text-[3.25rem] font-semibold leading-[0.98] sm:max-w-none sm:text-6xl sm:leading-[1.05] lg:text-7xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-[21rem] text-[0.98rem] leading-7 text-[#0d2b1a]/72 sm:max-w-xl sm:text-lg sm:leading-8">
          {t("subtitle")}
        </p>
        <div className="mt-6 flex w-full max-w-[20.5rem] items-center justify-center gap-3 sm:mt-8 sm:max-w-none">
          <a
            className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#1a5c38] px-5 text-sm font-semibold text-[#faf6ee] transition-colors hover:bg-[#0d2b1a] sm:flex-none sm:px-6"
            href="mailto:concierge@reiseria.com?subject=Plan%20my%20journey"
          >
            {t("planJourney")}
          </a>
          <a
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-[#0d2b1a]/15 bg-[#faf6ee]/86 px-5 text-sm font-semibold text-[#0d2b1a] backdrop-blur-sm transition-colors hover:bg-[#faf6ee] sm:flex-none sm:px-6"
            href="mailto:concierge@reiseria.com?subject=Talk%20to%20Reiseria"
          >
            {t("talkToUs")}
          </a>
        </div>
      </m.div>
    </m.section>
  );
}
