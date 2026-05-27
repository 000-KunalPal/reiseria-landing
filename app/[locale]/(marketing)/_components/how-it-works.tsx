"use client";

import { BookOpenText, MessageSquareText, PenLine, Plane } from "lucide-react";
import {
  motion,
  type MotionValue,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import SquigglyArrow from "@/components/animted-components/squiggle-arrow";

type StepType = {
  icon: typeof BookOpenText;
  title: string;
  description: string;
};

function StepCard({
  icon: Icon,
  title,
  description,
  index,
  progress,
  sectionInView,
  isLast,
}: StepType & {
  index: number;
  progress: MotionValue<number>;
  sectionInView: boolean;
  isLast: boolean;
}) {
  const fillStart = 0.08 + index * 0.22;
  const fillEnd = fillStart + 0.1;
  const connectorStart = fillEnd;
  const connectorEnd = connectorStart + 0.11;
  const rawFillProgress = useTransform(progress, [fillStart, fillEnd], [0, 1]);
  const fillProgress = useSpring(rawFillProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });
  const iconColor = useTransform(
    fillProgress,
    [0, 0.72],
    ["#1a5c38", "#faf6ee"],
  );
  const connectorProgress = useTransform(
    progress,
    [connectorStart, connectorEnd],
    [0, 1],
  );
  const contentOpacity = useTransform(
    progress,
    [fillStart - 0.05, fillStart + 0.06],
    [0.42, 1],
  );
  const contentY = useTransform(progress, [fillStart - 0.05, fillStart + 0.06], [12, 0]);

  return (
    <article className="group relative text-center">
      {!isLast ? (
        <span className="pointer-events-none absolute left-[calc(50%+3.35rem)] right-[calc(-50%+3.35rem)] top-10 hidden h-16 -translate-y-1/2 items-center justify-center text-[#1a5c38] lg:flex">
          <span className="h-16 w-full flex items-center justify-center">
            <SquigglyArrow
              width={160}
              height={64}
              strokeWidth={2.3}
              variant={index % 2 === 0 ? "wavy" : "smooth"}
              className="h-16 w-full"
              progress={connectorProgress}
            />
          </span>
        </span>
      ) : null}

      <motion.div
        className="relative z-10 mx-auto flex size-20 items-center justify-center overflow-hidden rounded-full border border-[#1a5c38]/25 bg-[#faf6ee] text-[#1a5c38] shadow-[0_18px_45px_rgba(13,43,26,0.08)]"
        initial={{ opacity: 0, scale: 0.72, y: 18 }}
        animate={sectionInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
          mass: 0.65,
          delay: index * 0.08,
        }}
      >
        <motion.span
          className="absolute inset-x-0 bottom-0 h-full origin-bottom bg-[#1a5c38]"
          style={{ scaleY: fillProgress }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border border-[#faf6ee]/20"
          style={{ opacity: fillProgress }}
        />
        <motion.span className="relative z-10" style={{ color: iconColor }}>
          <Icon className="size-6" strokeWidth={1.5} />
        </motion.span>
      </motion.div>

      <motion.h3
        className="mt-8 font-serif text-3xl font-semibold leading-tight text-[#1a5c38]"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="mx-auto mt-5 max-w-xs text-base leading-7 text-[#0d2b1a]/72"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {description}
      </motion.p>
    </article>
  );
}

export function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.18 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.45,
  });

  const steps: StepType[] = [
    {
      icon: BookOpenText,
      title: t("step1Title"),
      description: t("step1Desc"),
    },
    {
      icon: MessageSquareText,
      title: t("step2Title"),
      description: t("step2Desc"),
    },
    {
      icon: PenLine,
      title: t("step3Title"),
      description: t("step3Desc"),
    },
    {
      icon: Plane,
      title: t("step4Title"),
      description: t("step4Desc"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="border-y border-[#1a5c38]/12 bg-[#f0e6d2] px-5 py-20 sm:px-8 lg:h-[240vh] lg:px-16 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center lg:sticky lg:top-0 lg:h-screen lg:py-24">
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

        <div className="relative mt-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <StepCard
                key={title}
                icon={Icon}
                title={title}
                description={description}
                index={index}
                progress={timelineProgress}
                sectionInView={sectionInView}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
