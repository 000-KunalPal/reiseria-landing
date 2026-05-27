
"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const cloudinaryHeroBase =
  "https://res.cloudinary.com/dzf1iyxou/video/upload";

const heroVideo = {
  desktopWebm:
    `${cloudinaryHeroBase}/c_fill,g_center,h_1080,w_1920/f_webm/q_auto:best/v1779812814/output_fyrgyl.webm`,
  desktopMp4:
    `${cloudinaryHeroBase}/c_fill,g_center,h_1080,w_1920/f_mp4/q_auto:best/v1779812814/output_fyrgyl.mp4`,
  tabletWebm:
    `${cloudinaryHeroBase}/c_fill,g_center,h_1024,w_1536/f_webm/q_auto:best/v1779812814/output_fyrgyl.webm`,
  tabletMp4:
    `${cloudinaryHeroBase}/c_fill,g_center,h_1024,w_1536/f_mp4/q_auto:best/v1779812814/output_fyrgyl.mp4`,
  mobileWebm:
    `${cloudinaryHeroBase}/c_crop,g_north,h_810,w_1080/c_fill,g_center,h_1620,w_1080/f_webm/q_auto:best/v1779815022/output1_c5xaww.webm`,
  mobileMp4:
    `${cloudinaryHeroBase}/c_crop,g_north,h_810,w_1080/c_fill,g_center,h_1620,w_1080/f_mp4/q_auto:best/v1779815022/output1_c5xaww.mp4`,
  poster:
    `${cloudinaryHeroBase}/c_fill,g_center,h_1080,w_1920/f_jpg/q_auto:best/v1779812814/output_fyrgyl.jpg`,
  mobilePoster:
    `${cloudinaryHeroBase}/c_crop,g_north,h_810,w_1080/c_fill,g_center,h_1620,w_1080/f_jpg/q_auto:best/v1779815022/output1_c5xaww.jpg`,
};

function MouseScrollIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
    >
      <path d="M0 0h15v15H0z" fill="none" />
      <path
        fill="currentColor"
        d="M7.21 0C3.66.09 2.79 1.82 2.57 5.91c1.33-.34 2.92-.53 4.64-.56V4.22c-.35-.15-.58-.56-.58-1.01V2.13c.01-.45.24-.85.58-1zm.58 0v1.13c.34.15.57.55.58 1v1.08c0 .45-.23.86-.58 1.01v1.13c1.73.03 3.33.23 4.65.57C12.23 1.87 11.33.09 7.79 0M7.5 5.92c-1.87 0-3.59.22-4.96.59c-.02.68-.03 1.43-.04 2.24c0 .98.09 1.89.31 2.62C3.86 15 6.51 15 7.5 15s3.62.08 4.69-3.63c.22-.73.31-1.67.31-2.62c0-.81-.01-1.55-.03-2.24c-1.37-.37-3.09-.59-4.97-.59"
      />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const variant = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    (): "mobile" | "tablet" | "desktop" => {
      if (typeof window === "undefined") return "desktop";
      if (window.matchMedia("(max-width: 639px)").matches) return "mobile";
      if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
      return "desktop";
    },
    (): "mobile" | "tablet" | "desktop" => "desktop"
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => undefined);
  }, [variant]);

  const sources = {
    mobile: {
      webm: heroVideo.mobileWebm,
      mp4: heroVideo.mobileMp4,
    },
    tablet: {
      webm: heroVideo.tabletWebm,
      mp4: heroVideo.tabletMp4,
    },
    desktop: {
      webm: heroVideo.desktopWebm,
      mp4: heroVideo.desktopMp4,
    },
  }[variant];

  return (
    <section
      className="relative h-[calc(100svh-6rem)] w-full overflow-hidden bg-[#0d2b1a] lg:h-[100svh]"
    >
      <video
        ref={videoRef}
        key={variant}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={variant === "mobile" ? heroVideo.mobilePoster : heroVideo.poster}
        aria-label={t("videoLabel")}
      >
        <source src={sources.mp4} type="video/mp4" />
        <source src={sources.webm} type="video/webm" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#0d2b1a]/18" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/28 via-transparent to-black/18" />
      <div className="absolute inset-x-0 bottom-16 z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center text-white sm:bottom-auto sm:top-[28%] sm:px-8 lg:top-[30%] lg:px-10">
        <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.04] drop-shadow-[0_3px_18px_rgba(0,0,0,0.42)] sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-lg sm:leading-8">
          {t("subtitle")}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            className="rounded-full bg-[#faf6ee] px-5 py-3 text-sm font-semibold text-[#0d2b1a] transition-colors hover:bg-[#f0e6d2]"
            href="#final-cta"
          >
            {t("planJourney")}
          </a>
          <a
            className="rounded-full border border-[#faf6ee]/35 bg-[#0d2b1a]/20 px-5 py-3 text-sm font-semibold text-[#faf6ee] backdrop-blur-md transition-colors hover:bg-[#faf6ee]/12"
            href="#destinations"
          >
            {t("exploreJourneys")}
          </a>
        </div>
      </div>


      <div className="absolute inset-x-0 bottom-3 z-10 hidden justify-center text-white sm:bottom-5 sm:flex">
        <div
          className="flex size-10 animate-[hero-scroll-cue_1.4s_ease-in-out_infinite] items-center justify-center motion-reduce:animate-none"
          aria-hidden="true"
        >
          <MouseScrollIcon className="size-5" />
        </div>
      </div>
    </section>
  );
}
