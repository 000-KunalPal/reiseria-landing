"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ScrollHighlightText } from "@/components/animted-components/scroll-highlight";

const inlineImages = {
  oman: "/about-reiseria/oman-inline.webp",
  tajMahal: "/about-reiseria/taj-mahal-inline.webp",
  kerela: "/about-reiseria/kerela-inline.webp",
};

type InlineImageProps = {
  src: string;
  alt: string;
  label: string;
};

function InlineImage({ src, alt, label }: InlineImageProps) {
  return (
    <span
      tabIndex={0}
      role="img"
      aria-label={alt}
      className="group/img relative mx-1 inline-flex h-9 w-14 translate-y-1 cursor-pointer overflow-hidden rounded-lg shadow-[0_2px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 align-baseline outline-none transition-[transform,box-shadow,ring-color] duration-300 ease-out hover:-translate-y-1 hover:rotate-[-2deg] hover:scale-125 hover:shadow-[0_14px_34px_rgba(0,0,0,0.34)] hover:ring-[#d8b15f]/80 focus-visible:-translate-y-1 focus-visible:rotate-[-2deg] focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-[#d8b15f] sm:mx-2 sm:h-12 sm:w-[4.5rem] md:h-14 md:w-20"
    >
      <span className="block h-full w-full transition-transform duration-500 ease-out group-hover/img:scale-110 group-focus-visible/img:scale-110">
        <Image
          className="h-full w-full object-cover transition-[filter] duration-500 ease-out group-hover/img:saturate-125 group-hover/img:brightness-110 group-focus-visible/img:saturate-125 group-focus-visible/img:brightness-110"
          src={src}
          alt={alt}
          width={160}
          height={120}
          sizes="(max-width: 640px) 56px, (max-width: 768px) 72px, 80px"
          loading="lazy"
        />
      </span>

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a5c38]/40 via-transparent to-white/10 opacity-80 transition-opacity duration-300 group-hover/img:opacity-35 group-focus-visible/img:opacity-35" />

      <span className="pointer-events-none absolute inset-x-1 bottom-1 translate-y-2 rounded-full bg-[#faf6ee]/95 px-1.5 py-0.5 text-center font-sans text-[0.42rem] font-semibold uppercase leading-none tracking-[0.16em] text-[#0d2b1a] opacity-0 shadow-sm transition-[transform,opacity] duration-300 group-hover/img:translate-y-0 group-hover/img:opacity-100 group-focus-visible/img:translate-y-0 group-focus-visible/img:opacity-100 sm:text-[0.5rem]">
        {label}
      </span>
    </span>
  );
}

function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
      style={{
        backgroundImage:
          "url('/textures/grain-128.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

export function AboutReiseria() {
  const t = useTranslations("AboutReiseria");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const paragraph = t("paragraph");

  return (
    <motion.section
      ref={sectionRef}
      id="about-reiseria"
      className="relative overflow-hidden bg-[#1a5c38] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <GrainOverlay />

      <motion.div
        className="relative z-20 mx-auto mb-10 flex items-center justify-center gap-4 sm:mb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="h-px w-8 bg-[#d8b15f]/50 sm:w-12" />
        <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#d8b15f]/80 sm:text-xs">
          {t("title")}
        </span>
        <span className="h-px w-8 bg-[#d8b15f]/50 sm:w-12" />
      </motion.div>

      <div
        className="relative z-20 mx-auto max-w-5xl text-center"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1px 320px",
        }}
      >
        <ScrollHighlightText
          paragraphs={[paragraph]}
          activeClassName="text-[#faf6ee]"
          inactiveClassName="text-[#faf6ee]/15"
          className="font-serif text-[1.75rem] leading-[1.35] font-semibold sm:text-4xl sm:leading-[1.28] md:text-[2.85rem] md:leading-[1.22] lg:text-5xl lg:leading-[1.2]"
          renderWord={(word) => {
            if (word === "[[oman]]") {
              return (
                <InlineImage
                  src={inlineImages.oman}
                  alt={t("omanAlt")}
                  label={t("oman")}
                />
              );
            }

            if (word === "[[tajMahal]]") {
              return (
                <InlineImage
                  src={inlineImages.tajMahal}
                  alt={t("indiaAlt")}
                  label={t("india")}
                />
              );
            }

            if (word === "[[kerela]]") {
              return (
                <InlineImage
                  src={inlineImages.kerela}
                  alt={t("keralaAlt")}
                  label={t("kerala")}
                />
              );
            }

            return word;
          }}
        />
      </div>
    </motion.section>
  );
}