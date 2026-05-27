"use client";

import { XIcon, PhoneIcon, ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCurrency } from "@/components/currency-context";
import { routing, type Locale } from "@/i18n/routing";

import { cn } from "@/lib/utils";

type UtilityStripProps = {
  className?: string;
};

const LANGUAGE_OPTIONS: Record<Locale, { label: string; flag: string }> = {
  en: { label: "UK", flag: "🇬🇧" },
  de: { label: "DE", flag: "🇩🇪" },
  fr: { label: "FR", flag: "🇫🇷" },
  it: { label: "IT", flag: "🇮🇹" },
};

const LANGUAGES = routing.locales.map((locale) => ({
  value: locale,
  ...LANGUAGE_OPTIONS[locale],
}));

function getPathnameWithoutLocale(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (!routing.locales.includes(maybeLocale as Locale)) {
    return pathname || "/";
  }

  const nextPathname = `/${segments.slice(2).join("/")}`;
  return nextPathname === "/" ? "/" : nextPathname.replace(/\/$/, "");
}

const CURRENCIES = [
  { value: "USD", label: "USD", symbol: "$" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "CAD", label: "CAD", symbol: "$" },
] as const;

/* ------------------------------------------------------------------ */
/*  Tiny dropdown used for both language and currency switchers        */
/* ------------------------------------------------------------------ */
function MiniDropdown({
  trigger,
  items,
  onSelect,
}: {
  trigger: React.ReactNode;
  items: { value: string; label: React.ReactNode }[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* close on outside click or Escape key */
  useEffect(() => {
    if (!open) return;
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  // Focus first item when opening
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-1 p-0 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#faf6ee]/80 hover:text-[#faf6ee] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c4944a] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d2b1a] rounded"
      >
        {trigger}
        <ChevronDownIcon className="size-3 text-[#faf6ee]/60" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-[70] mt-1.5 min-w-[110px] animate-in fade-in-0 zoom-in-95 rounded-md border border-[#c4944a]/30 bg-[#faf6ee] p-1 text-[#0d2b1a] shadow-xl">
          {items.map((item, index) => (
            <button
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              key={item.value}
              type="button"
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              onClick={() => {
                onSelect(item.value);
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-[0.72rem] font-medium transition-colors hover:bg-[#1a5c38]/10 hover:text-[#0d2b1a] focus:bg-[#1a5c38]/10 focus:text-[#0d2b1a] focus:outline-none select-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main UtilityStrip component                                       */
/* ------------------------------------------------------------------ */
export function UtilityStrip({ className }: UtilityStripProps) {
  const t = useTranslations("UtilityStrip");
  const locale = useLocale();
  const { replace } = useRouter();
  const { currency, setCurrency } = useCurrency();
  const [dismissed, setDismissed] = useState(false);

  const dismissStrip = () => {
    setDismissed(true);
    window.dispatchEvent(new Event("utility-strip-dismissed"));
  };

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const url = new URL(window.location.href);
    const href = `${getPathnameWithoutLocale(url.pathname)}${url.search}${url.hash}`;

    replace(href, { locale: nextLocale as Locale });
  };

  const currentLang = LANGUAGES.find((l) => l.value === locale) || LANGUAGES[0];

  return (
    <aside
      className={cn(
        "fixed inset-x-0 top-0 z-[60] grid overflow-visible border-b border-[#c4944a]/40 bg-[#0d2b1a] text-[#faf6ee] transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        dismissed
          ? "grid-rows-[0fr] -translate-y-full opacity-0"
          : "grid-rows-[1fr] translate-y-0 opacity-100",
        className
      )}
      style={{ viewTransitionName: "utility-strip" }}
    >
      <div className="min-h-0">
        <div className="relative mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left Side: Language Switcher & Currency Switcher */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <MiniDropdown
              trigger={
                <span className="flex items-center gap-1.5">
                  <span>{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                </span>
              }
              items={LANGUAGES.map((lang) => ({
                value: lang.value,
                label: (
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                ),
              }))}
              onSelect={handleLanguageChange}
            />

            {/* Vertical Divider */}
            <span className="h-3.5 w-px bg-[#c4944a]/30" aria-hidden="true" />

            {/* Currency Switcher */}
            <MiniDropdown
              trigger={<span>{currency}</span>}
              items={CURRENCIES.map((curr) => ({
                value: curr.value,
                label: (
                  <span>
                    {curr.label} ({curr.symbol})
                  </span>
                ),
              }))}
              onSelect={(val) => setCurrency(val as typeof currency)}
            />
          </div>

          {/* Center Side: Announcement (Desktop Only) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block min-w-0 overflow-hidden text-center max-w-[40%]">
            <p className="utility-strip-shimmer inline-block max-w-full truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#faf6ee]">
              {t("announcement")}
            </p>
          </div>

          {/* Right Side: Phone, WhatsApp & Close Button */}
          <div className="flex items-center gap-3">
            {/* Phone link */}
            <a
              href="tel:+4917643519885"
              className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-[#faf6ee]/80 hover:text-[#faf6ee] transition-colors"
            >
              <PhoneIcon className="size-3.5 text-[#c4944a]" />
              <span className="hidden sm:inline">+49 176 43519885</span>
            </a>

            {/* WhatsApp link */}
            <span className="h-3.5 w-px bg-[#c4944a]/30" aria-hidden="true" />
            <a
              href="https://wa.me/4917643519885"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full hover:bg-[#faf6ee]/10 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 360 362">
                <path
                  fill="#25D366"
                  fillRule="evenodd"
                  d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Close Button */}
            <span className="h-3.5 w-px bg-[#c4944a]/30" aria-hidden="true" />
            <button
              aria-label={t("dismiss")}
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[#faf6ee]/80 transition-colors hover:bg-[#faf6ee]/10 hover:text-[#faf6ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4944a]"
              onClick={dismissStrip}
              type="button"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
