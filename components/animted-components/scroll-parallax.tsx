"use client";

import { m, type MotionValue, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { WhyReiseria } from "@/app/[locale]/(marketing)/_components/why-reiseria";

type ParallaxImage = {
    src: string;
    alt: string;
};

const ParallaxScroll = () => {
    const t = useTranslations("ParallaxScroll");
    const isParallaxEnabled = useSyncExternalStore(
        (callback) => {
            window.addEventListener("resize", callback);
            return () => window.removeEventListener("resize", callback);
        },
        () =>
            typeof window !== "undefined" &&
            window.innerWidth >= 768 &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        () => false
    );

    const images: ParallaxImage[] = [
        {
            src: "/months/january-gallery.webp",
            alt: t("januaryAlt"),
        },
        {
            src: "/about-reiseria/kerela-gallery.webp",
            alt: t("keralaAlt"),
        },
        {
            src: "/months/august-gallery.webp",
            alt: t("augustAlt"),
        },
        {
            src: "/months/march-gallery.webp",
            alt: t("marchAlt"),
        },
        {
            src: "/about-reiseria/oman-gallery.webp",
            alt: t("omanAlt"),
        },
        {
            src: "/months/july-gallery.webp",
            alt: t("julyAlt"),
        },
        {
            src: "/months/may-gallery.webp",
            alt: t("mayAlt"),
        },
        {
            src: "/months/october-gallery.webp",
            alt: t("octoberAlt"),
        },
        {
            src: "/traveller-type/solo-gallery.webp",
            alt: t("soloAlt"),
        },
        {
            src: "/featured-itineraries/ola1-gallery.webp",
            alt: t("omanMosqueAlt"),
        },
        {
            src: "/traveller-type/couple-gallery.webp",
            alt: t("coupleAlt"),
        },
        {
            src: "/featured-itineraries/rie2-gallery.webp",
            alt: t("indiaPalaceAlt"),
        },
    ];

    return (
        <main className="w-full bg-[#faf6ee] font-sans text-[#0d2b1a]">
            <GalleryIntro title={t("title")} subtitle={t("subtitle")} />
            {isParallaxEnabled ? <ParallaxCollage images={images} /> : <StaticCollage images={images} />}
            <WhyReiseria />
        </main>
    );
};

const GalleryIntro = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <section className="overflow-hidden bg-[#1a5c38] px-5 py-20 text-[#faf6ee] sm:px-8 sm:py-24 lg:px-16 lg:py-28">
            <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
                <h2 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">
                    {title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#faf6ee]/78 sm:text-lg">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

const StaticCollage = ({ images }: { images: ParallaxImage[] }) => {
    return (
        <section className="w-full overflow-hidden bg-[#faf6ee] px-3 py-3 text-[#0d2b1a] sm:px-5 sm:py-5">
            <div className="grid auto-rows-[42vw] grid-cols-2 gap-3 sm:auto-rows-[30vw] sm:grid-cols-3 sm:gap-4">
                {images.slice(0, 9).map((image, index) => (
                    <div
                        key={image.src}
                        className={[
                            "group relative overflow-hidden rounded-2xl bg-[#d4e2d5]",
                            index === 0 || index === 5 ? "row-span-2" : "",
                            index === 3 ? "col-span-2" : "",
                        ].join(" ")}
                    >
                        <Image
                            fill
                            sizes="(max-width: 640px) 50vw, 33vw"
                            src={image.src}
                            alt={image.alt}
                            className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

const ParallaxCollage = ({ images }: { images: ParallaxImage[] }) => {
    const gallery = useRef<HTMLDivElement>(null);
    const height = useSyncExternalStore(
        (callback) => {
            window.addEventListener("resize", callback);
            return () => window.removeEventListener("resize", callback);
        },
        () => (typeof window !== "undefined" ? window.innerHeight : 0),
        () => 0
    );

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    return (
        <section
            ref={gallery}
            className="relative box-border flex h-[150vh] gap-[2vw] overflow-hidden bg-[#faf6ee] p-[2vw] lg:h-[175vh]"
        >
            <Column imageSources={[images[0], images[1], images[2]]} y={y} />
            <Column imageSources={[images[3], images[4], images[5]]} y={y2} />
            <Column imageSources={[images[6], images[7], images[8]]} y={y3} />
            <Column imageSources={[images[9], images[10], images[11]]} y={y4} />
        </section>
    );
};

type ColumnProps = {
    imageSources: ParallaxImage[];
    y: MotionValue<number>;
};

const Column = ({ imageSources, y }: ColumnProps) => {
    return (
        <m.div
            className="relative flex h-full w-1/3 min-w-0 flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:hidden lg:w-1/4 lg:[&:nth-child(4)]:flex lg:[&:nth-child(4)]:top-[-75%]"
            style={{ y }}
        >
            {imageSources.map((image) => (
                <div
                    key={image.src}
                    className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#d4e2d5]"
                >
                    <Image
                        fill
                        sizes="(max-width: 1024px) 33vw, 25vw"
                        src={image.src}
                        alt={image.alt}
                        className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>
            ))}
        </m.div>
    );
};

export { ParallaxScroll };
