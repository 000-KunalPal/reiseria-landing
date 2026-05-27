"use client";

import { ReactLenis } from "lenis/react";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
