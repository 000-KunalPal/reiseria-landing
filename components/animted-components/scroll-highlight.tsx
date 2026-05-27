"use client";

import React, { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollHighlightTextProps = {
  paragraphs: string[];
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  renderWord?: (word: string, state: { isActive: boolean }) => ReactNode;
};

export const ScrollHighlightText = ({
  paragraphs,
  className,
  activeClassName = "text-zinc-950",
  inactiveClassName = "text-zinc-400",
  renderWord,
}: ScrollHighlightTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const parsed = useMemo(() => {
    const paragraphWords = paragraphs.map((paragraph) => paragraph.split(" "));
    const paragraphStarts: number[] = [];
    let total = 0;

    for (const words of paragraphWords) {
      paragraphStarts.push(total);
      total += words.length;
    }

    return {
      paragraphWords,
      paragraphStarts,
      wordCount: total,
    };
  }, [paragraphs]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 46%"],
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.max(
      0,
      Math.min(
        parsed.wordCount - 1,
        Math.round(latest * Math.max(parsed.wordCount - 1, 0))
      )
    );

    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <div ref={ref} className={className}>
      {parsed.paragraphWords.map((words, paragraphIndex) => (
        <p
          key={paragraphs[paragraphIndex]}
          className={cn(
            "transition-opacity duration-700 ease-out",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          {words.map((word, index) => {
            const wordIndex = parsed.paragraphStarts[paragraphIndex] + index;
            const isActive = wordIndex <= activeIndex;
            const key = `${word}-${wordIndex}`;

            return (
              <React.Fragment key={key}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-200 will-change-[color]",
                    isActive ? activeClassName : inactiveClassName
                  )}
                >
                  {renderWord ? renderWord(word, { isActive }) : word}
                </span>{" "}
              </React.Fragment>
            );
          })}
        </p>
      ))}
    </div>
  );
};

export default ScrollHighlightText;