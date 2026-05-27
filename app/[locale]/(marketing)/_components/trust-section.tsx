"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type ReviewType = {
  quote: string;
  name: string;
  route: string;
  meta: string;
  avatar: string;
};

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-8"
      viewBox="0 0 256 262"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285f4"
        d="M255.9 133.5c0-10.7-.9-18.5-2.8-26.6H130.6v48.3h71.9c-1.4 12-9.3 30.1-26.6 42.2l-.2 1.6 38.7 30 .2.1c25-23.1 39.3-57.1 39.3-95.6Z"
      />
      <path
        fill="#34a853"
        d="M130.6 261.1c35.7 0 65.7-11.7 87.6-31.9l-41.8-32.4c-11.2 7.8-26.2 13.2-45.8 13.2-35 0-64.7-23.1-75.3-54.9l-1.5.1-40.2 31.1-.5 1.5c21.8 43.4 66.7 73.3 117.5 73.3Z"
      />
      <path
        fill="#fbbc05"
        d="M55.3 155.1c-2.8-8.1-4.4-16.8-4.4-25.8s1.6-17.7 4.3-25.8l-.1-1.7-40.7-31.5-1.3.6C4.8 87.5 0 107.9 0 129.3s4.8 41.8 13.1 58.5l42.2-32.7Z"
      />
      <path
        fill="#eb4335"
        d="M130.6 48.5c24.8 0 41.5 10.7 51 19.7l37.3-36.4C196 10.5 166.3 0 130.6 0 79.8 0 34.9 29.9 13.1 73.2l42.1 32.7c10.7-31.8 40.4-57.4 75.4-57.4Z"
      />
    </svg>
  );
}

function TrustpilotMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-32"
      viewBox="20.5 248.5 600 147.3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#111827"
        d="M178.2 300.7h60.7V312H215v63.7h-13.1V312h-23.8zm58.1 20.7h11.2v10.5h.2c.4-1.5 1.1-2.9 2.1-4.3s2.2-2.7 3.7-3.8c1.4-1.2 3-2.1 4.8-2.8 1.7-.7 3.5-1.1 5.3-1.1 1.4 0 2.4.1 2.9.1.5.1 1.1.2 1.6.2v11.5c-.8-.2-1.7-.3-2.6-.4s-1.7-.2-2.6-.2c-2 0-3.9.4-5.7 1.2s-3.3 2-4.7 3.5c-1.3 1.6-2.4 3.5-3.2 5.8s-1.2 5-1.2 8v25.8h-12zm86.8 54.3h-11.8v-7.6h-.2c-1.5 2.8-3.7 4.9-6.6 6.6s-5.9 2.5-8.9 2.5c-7.1 0-12.3-1.7-15.5-5.3-3.2-3.5-4.8-8.9-4.8-16v-34.5h12v33.3c0 4.8.9 8.2 2.8 10.1 1.8 2 4.4 3 7.7 3 2.5 0 4.6-.4 6.3-1.2s3.1-1.8 4.1-3.1c1.1-1.3 1.8-2.9 2.3-4.7s.7-3.8.7-5.9v-31.5h12v54.3zm20.4-17.4c.4 3.5 1.7 5.9 4 7.4 2.3 1.4 5.1 2.1 8.3 2.1 1.1 0 2.4-.1 3.8-.3s2.8-.5 4-1c1.3-.5 2.3-1.2 3.1-2.2s1.2-2.2 1.1-3.7-.6-2.8-1.7-3.8-2.4-1.7-4-2.4c-1.6-.6-3.5-1.1-5.6-1.5s-4.2-.9-6.4-1.4-4.4-1.1-6.5-1.8-3.9-1.6-5.6-2.9c-1.6-1.2-3-2.7-3.9-4.6-1-1.9-1.5-4.1-1.5-6.9 0-3 .7-5.4 2.2-7.4 1.4-2 3.3-3.6 5.5-4.8s4.7-2.1 7.4-2.6 5.3-.7 7.7-.7c2.8 0 5.5.3 8 .9s4.9 1.5 6.9 2.9c2.1 1.3 3.8 3.1 5.1 5.2 1.4 2.1 2.2 4.7 2.6 7.7h-12.5c-.6-2.9-1.9-4.8-3.9-5.8-2.1-1-4.4-1.5-7.1-1.5-.8 0-1.9.1-3 .2-1.2.2-2.2.4-3.3.8-1 .4-1.9 1-2.6 1.7s-1.1 1.7-1.1 2.9c0 1.5.5 2.6 1.5 3.5s2.3 1.6 4 2.3c1.6.6 3.5 1.1 5.6 1.5s4.3.9 6.5 1.4 4.3 1.1 6.4 1.8 4 1.6 5.6 2.9c1.6 1.2 3 2.7 4 4.5s1.5 4.1 1.5 6.7c0 3.2-.7 5.9-2.2 8.2-1.5 2.2-3.4 4.1-5.7 5.5s-5 2.4-7.8 3.1c-2.9.6-5.7 1-8.5 1-3.4 0-6.6-.4-9.5-1.2s-5.5-2-7.6-3.5c-2.1-1.6-3.8-3.5-5-5.9-1.2-2.3-1.9-5.1-2-8.4h12.1v.1zm39.5-36.9h9.1V305h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32H383v-9.1zm40.3 0h11.3v7.4h.2c1.7-3.2 4-5.4 7-6.8s6.2-2.1 9.8-2.1c4.3 0 8 .7 11.2 2.3 3.2 1.5 5.8 3.5 7.9 6.2 2.1 2.6 3.7 5.7 4.7 9.2s1.6 7.3 1.6 11.2c0 3.7-.5 7.2-1.4 10.6-1 3.4-2.4 6.5-4.3 9.1s-4.3 4.7-7.3 6.3-6.4 2.4-10.4 2.4c-1.7 0-3.5-.2-5.2-.5s-3.4-.8-5-1.5-3.1-1.6-4.4-2.7c-1.4-1.1-2.5-2.4-3.4-3.8h-.2v27.1h-12v-74.4zm41.9 27.2c0-2.4-.3-4.8-1-7.1-.6-2.3-1.6-4.3-2.9-6.1s-2.9-3.2-4.7-4.3c-1.9-1.1-4.1-1.6-6.5-1.6-5 0-8.8 1.7-11.4 5.2-2.5 3.5-3.8 8.2-3.8 14 0 2.8.3 5.3 1 7.6s1.6 4.3 3 6c1.3 1.7 2.9 3 4.8 4s4 1.5 6.5 1.5c2.8 0 5-.6 6.9-1.7s3.4-2.6 4.7-4.3c1.2-1.8 2.1-3.8 2.6-6.1.5-2.4.8-4.7.8-7.1zm21.1-47.9h12V312h-12zm0 20.7h12v54.3h-12zm22.7-20.7h12v75h-12zm48.6 76.5c-4.3 0-8.2-.7-11.6-2.2s-6.2-3.4-8.6-5.9c-2.3-2.5-4.1-5.6-5.3-9.1s-1.9-7.4-1.9-11.5.6-7.9 1.9-11.4c1.2-3.5 3-6.5 5.3-9.1 2.3-2.5 5.2-4.5 8.6-5.9s7.3-2.2 11.6-2.2 8.2.7 11.6 2.2c3.4 1.4 6.2 3.4 8.6 5.9 2.3 2.5 4.1 5.6 5.3 9.1s1.9 7.3 1.9 11.4c0 4.2-.6 8-1.9 11.5s-3 6.5-5.3 9.1c-2.3 2.5-5.2 4.5-8.6 5.9s-7.2 2.2-11.6 2.2zm0-9.5c2.6 0 5-.6 6.9-1.7 2-1.1 3.5-2.6 4.8-4.4s2.2-3.9 2.8-6.1c.6-2.3.9-4.6.9-7 0-2.3-.3-4.6-.9-6.9s-1.5-4.3-2.8-6.1-2.9-3.2-4.8-4.3c-2-1.1-4.3-1.7-6.9-1.7s-5 .6-6.9 1.7c-2 1.1-3.5 2.6-4.8 4.3-1.3 1.8-2.2 3.8-2.8 6.1s-.9 4.6-.9 6.9c0 2.4.3 4.7.9 7s1.5 4.3 2.8 6.1 2.9 3.3 4.8 4.4c2 1.2 4.3 1.7 6.9 1.7zm31-46.3h9.1V305h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32h-9.1v-9.1z"
      />
      <path
        fill="#00b67a"
        d="M164.2 300.7h-54.9l-16.9-52.2-17 52.2-54.9-.1 44.4 32.3-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2z"
      />
      <path fill="#005128" d="m123.6 344.7-3.8-11.8-27.4 19.9z" />
    </svg>
  );
}

function CountUpRating({ value }: { value: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const rating = useMotionValue(0);
  const rounded = useTransform(rating, (latest) => latest.toFixed(1));
  const [displayValue, setDisplayValue] = useState("0.0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplayValue);
    return () => {
      unsubscribe();
    };
  }, [rounded]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(rating, value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [isInView, rating, value]);

  return (
    <p
      ref={ref}
      className="mt-3 font-serif text-3xl font-semibold text-[#1a5c38]"
    >
      {displayValue}/5
    </p>
  );
}

export function TrustSection() {
  const t = useTranslations("TrustSection");
  const [activeReview, setActiveReview] = useState(0);
  const isPausedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const reviews: ReviewType[] = [
    {
      quote: t("review1Quote"),
      name: t("review1Name"),
      route: t("review1Route"),
      meta: t("review1Meta"),
      avatar: "/traveller-type/family-card.webp",
    },
    {
      quote: t("review2Quote"),
      name: t("review2Name"),
      route: t("review2Route"),
      meta: t("review2Meta"),
      avatar: "/traveller-type/couple-card.webp",
    },
    {
      quote: t("review3Quote"),
      name: t("review3Name"),
      route: t("review3Route"),
      meta: t("review3Meta"),
      avatar: "/featured-itineraries/io3-card.webp",
    },
    {
      quote: t("review4Quote"),
      name: t("review4Name"),
      route: t("review4Route"),
      meta: t("review4Meta"),
      avatar: "/traveller-type/solo-card.webp",
    },
    {
      quote: t("review5Quote"),
      name: t("review5Name"),
      route: t("review5Route"),
      meta: t("review5Meta"),
      avatar: "/featured-itineraries/rie2-card.webp",
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!isPausedRef.current) {
        setActiveReview((current) => (current + 1) % reviews.length);
      }
    }, 5500);

    return () => window.clearInterval(interval);
  }, [reviews.length]);

  const showPreviousReview = () => {
    setActiveReview((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const showNextReview = () => {
    setActiveReview((current) => (current + 1) % reviews.length);
  };

  return (
    <m.section
      ref={sectionRef}
      className="bg-[#faf6ee] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <m.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#1a5c38]">
              <span className="size-2.5 rounded-full bg-[#1a5c38]" />
              {t("badge")}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#0d2b1a] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#0d2b1a]/72">
              {t("subtitle")}
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#1a5c38]/20 px-5 py-3 text-sm font-semibold text-[#1a5c38] transition hover:border-[#1a5c38]/45 hover:bg-white/70"
              href="#contact"
            >
              {t("readGuestStories")}
              <ArrowRight className="size-4" strokeWidth={1.7} />
            </a>
          </m.div>

          <m.article
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
            onFocus={() => { isPausedRef.current = true; }}
            onBlur={() => { isPausedRef.current = false; }}
            className="relative overflow-hidden rounded-2xl border border-[#1a5c38]/10 bg-white/80 p-6 sm:p-8 lg:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-1 text-[#c4944a]" aria-label={t("starReview")}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    className="size-4 fill-current"
                    key={index}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#d4e2d5] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1a5c38]">
                <CheckCircle2 className="size-3.5" strokeWidth={2} />
                {t("verifiedReview")}
              </span>
            </div>

            <div className="relative mt-8 h-[400px] overflow-hidden sm:h-[370px] lg:h-[400px] xl:h-[370px]">
              {reviews.map((item, index) => (
                <m.div
                  key={item.name}
                  initial={false}
                  animate={{
                    opacity: index === activeReview ? 1 : 0,
                    y: index === activeReview ? 0 : 12,
                    filter: index === activeReview ? "blur(0px)" : "blur(8px)",
                    pointerEvents: index === activeReview ? "auto" : "none",
                  }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <blockquote className="font-serif text-2xl leading-tight font-semibold text-[#0d2b1a] sm:text-[1.8rem] lg:text-[2.1rem]">
                    &quot;{item.quote}&quot;
                  </blockquote>

                  <div className="mt-auto flex flex-col gap-4 border-t border-[#1a5c38]/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative size-14 overflow-hidden rounded-xl border-2 border-[#faf6ee] bg-[#d4e2d5] shadow-sm">
                        <Image
                          fill
                          src={item.avatar}
                          alt={`${item.name} traveller photo`}
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a5c38]">{item.name}</p>
                        <p className="mt-1 text-sm text-[#0d2b1a]/65">
                          {item.route}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#0d2b1a]/55">
                      {item.meta}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {reviews.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Review ${index + 1}`}
                    onClick={() => setActiveReview(index)}
                    className={`h-2.5 rounded-md transition-all ${
                      index === activeReview
                        ? "w-8 bg-[#1a5c38]"
                        : "w-2.5 bg-[#1a5c38]/22 hover:bg-[#1a5c38]/45"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={t("prevReview")}
                  onClick={showPreviousReview}
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-[#1a5c38]/15 text-[#1a5c38] transition hover:border-[#1a5c38]/40 hover:bg-[#f0e6d2]"
                >
                  <ChevronLeft className="size-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  aria-label={t("nextReview")}
                  onClick={showNextReview}
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-[#1a5c38]/15 text-[#1a5c38] transition hover:border-[#1a5c38]/40 hover:bg-[#f0e6d2]"
                >
                  <ChevronRight className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </m.article>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#1a5c38]/10 bg-[#1a5c38]/10 sm:grid-cols-3"
        >
          <div className="flex flex-col items-center justify-center bg-[#f0e6d2] p-6 text-center">
            <GoogleMark />
            <CountUpRating value={4.8} />
            <p className="mt-2 text-sm font-medium text-[#0d2b1a]/65">
              {t("googleRating")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#f0e6d2] p-6 text-center">
            <TrustpilotMark />
            <CountUpRating value={4.8} />
            <p className="mt-2 text-sm font-medium text-[#0d2b1a]/65">
              {t("trustpilotRating")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#f0e6d2] p-6 text-center">
            <Clock className="size-8 text-[#1a5c38]" strokeWidth={1.6} />
            <p className="mt-3 font-serif text-3xl font-semibold text-[#1a5c38]">
              24/7
            </p>
            <p className="mt-2 text-sm font-medium text-[#0d2b1a]/65">
              {t("supportLabel")}
            </p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[28px] bg-[#1a5c38] px-6 py-5 text-center sm:flex-row sm:text-left"
        >
          <p className="text-sm leading-6 text-[#faf6ee]/82 lg:whitespace-nowrap">
            {t("readyToPlan")}
          </p>
          <a
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#faf6ee] px-5 py-3 text-sm font-semibold text-[#1a5c38] transition hover:bg-[#f0e6d2]"
            href="#contact"
          >
            {t("startPlanning")}
            <ArrowRight className="size-4" strokeWidth={1.7} />
          </a>
        </m.div>
      </div>
    </m.section>
  );
}
