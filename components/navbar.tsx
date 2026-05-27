"use client";

import { ArrowRightIcon, MenuIcon } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const hasScrolled = useSyncExternalStore(
    (callback) => {
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    () => typeof window !== "undefined" && window.scrollY > 24,
    () => false
  );
  const [utilityStripVisible, setUtilityStripVisible] = useState(true);

  const navItems = [
    { href: "#destinations", label: t("destinations") },
    { href: "#itinerary", label: t("itinerary") },
    { href: "#how-it-works", label: t("howItWorks") },
  ];

  useEffect(() => {
    const dismissUtilityStrip = () => {
      setUtilityStripVisible(false);
    };

    window.addEventListener("utility-strip-dismissed", dismissUtilityStrip);

    return () => {
      window.removeEventListener("utility-strip-dismissed", dismissUtilityStrip);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 z-50 border-b transition-all duration-300",
        utilityStripVisible ? "top-8" : "top-0",
        hasScrolled
          ? "border-[#1a5c38]/10 bg-[#faf6ee]/92 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-[#faf6ee] lg:bg-transparent",
      ].join(" ")}
      style={{ viewTransitionName: "site-header" }}
    >
      <div
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6"
      >
        <span
          className={[
            "font-serif text-2xl font-semibold transition-colors",
            hasScrolled ? "text-[#0d2b1a]" : "text-[#0d2b1a] lg:text-[#faf6ee]",
          ].join(" ")}
        >
          {t("logo")}
        </span>
        <nav
          className={[
            "hidden items-center gap-8 text-sm font-medium transition-colors md:flex",
            hasScrolled ? "text-[#0d2b1a]/70" : "text-[#0d2b1a]/70 lg:text-[#faf6ee]/82",
          ].join(" ")}
        >
          {navItems.map((item) => (
            <a
              className="transition-colors hover:text-[#1a5c38] lg:hover:text-current"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className={[
            "hidden rounded-full px-4 py-2 text-sm font-medium transition-colors md:inline-flex",
            hasScrolled
              ? "bg-[#1a5c38] text-[#faf6ee] hover:bg-[#0d2b1a]"
              : "bg-[#1a5c38] text-[#faf6ee] hover:bg-[#0d2b1a] lg:bg-[#faf6ee] lg:text-[#0d2b1a] lg:hover:bg-[#f0e6d2]",
          ].join(" ")}
          href="#final-cta"
        >
          {t("startPlanning")}
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label={t("openMenu")}
              className={[
                "size-11 rounded-full md:hidden",
                hasScrolled
                  ? "text-[#0d2b1a] hover:bg-[#1a5c38]/10"
                  : "text-[#0d2b1a] hover:bg-[#1a5c38]/10 lg:text-[#faf6ee]",
              ].join(" ")}
              size="icon"
              variant="ghost"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="!inset-0 !z-[100] !h-[100dvh] !w-screen !max-w-none border-l-0 bg-[#faf6ee] p-0 text-[#0d2b1a] shadow-none md:hidden"
            showCloseButton={false}
            side="right"
          >
            <SheetHeader className="flex-row items-center justify-between border-b border-[#1a5c38]/10 px-6 py-5">
              <SheetTitle className="font-serif text-2xl text-[#0d2b1a]">
                {t("logo")}
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  aria-label={t("closeMenu")}
                  className="size-11 rounded-full border border-[#1a5c38]/10 bg-[#f0e6d2] text-[#0d2b1a] hover:bg-[#e4d5be]"
                  size="icon"
                  variant="ghost"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </Button>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-1 flex-col justify-center px-6 py-10">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    className="group flex items-center justify-between border-b border-[#1a5c38]/12 py-6 font-serif text-[2.45rem] font-semibold leading-none tracking-normal transition-colors hover:text-[#1a5c38]"
                    href={item.href}
                  >
                    <span>{item.label}</span>
                    <ArrowRightIcon className="size-6 opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-70" />
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="border-t border-[#1a5c38]/10 p-6">
              <SheetClose asChild>
                <a
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#1a5c38] px-5 text-base font-semibold text-[#faf6ee] transition-colors hover:bg-[#0d2b1a]"
                  href="#final-cta"
                >
                  {t("startPlanning")}
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
