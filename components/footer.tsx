"use client";

import {
  ArrowUpIcon,
  Clock3Icon,
  CreditCardIcon,
  MailIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Francais" },
  { code: "it", label: "Italiano" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 264.583 264.583">
      <defs>
        <radialGradient id="instagram_icon__f" cx="158.429" cy="578.088" r="52.352" fx="158.429" fy="578.088" gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.227 942.236)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fc0" /><stop offset=".124" stopColor="#fc0" /><stop offset=".567" stopColor="#fe4a05" /><stop offset=".694" stopColor="#ff0f3f" /><stop offset="1" stopColor="#fe0657" stopOpacity="0" /></radialGradient>
        <radialGradient id="instagram_icon__g" cx="172.615" cy="600.692" r="65" fx="172.615" fy="600.692" gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.366 -47.835)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fc0" /><stop offset="1" stopColor="#fc0" stopOpacity="0" /></radialGradient>
        <radialGradient id="instagram_icon__h" cx="144.012" cy="51.337" r="67.081" fx="144.012" fy="51.337" gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.996 -26.404)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#780cff" /><stop offset="1" stopColor="#820bff" stopOpacity="0" /></radialGradient>
        <radialGradient id="instagram_icon__e" cx="199.788" cy="628.438" r="52.352" fx="199.788" fy="628.438" gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.65 1374.198)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ff005f" /><stop offset="1" stopColor="#fc01d8" /></radialGradient>
      </defs>
      {["instagram_icon__e", "instagram_icon__f", "instagram_icon__g", "instagram_icon__h"].map((id) => (
        <path key={id} fill={`url(#${id})`} d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z" transform="translate(-71.816 -18.143)" />
      ))}
      <path fill="#fff" d="M132.345 33.973c-26.716 0-30.07.117-40.563.594-10.472.48-17.62 2.136-23.876 4.567-6.47 2.51-11.958 5.87-17.426 11.335-5.472 5.464-8.834 10.948-11.354 17.412-2.44 6.252-4.1 13.397-4.57 23.858-.47 10.486-.593 13.838-.593 40.535 0 26.697.119 30.037.594 40.522.482 10.465 2.14 17.609 4.57 23.859 2.515 6.465 5.876 11.95 11.346 17.414 5.466 5.468 10.955 8.834 17.42 11.345 6.26 2.431 13.41 4.088 23.881 4.567 10.493.477 13.844.594 40.559.594 26.719 0 30.061-.117 40.555-.594 10.472-.48 17.63-2.136 23.888-4.567 6.468-2.51 11.948-5.877 17.414-11.345 5.472-5.464 8.834-10.949 11.354-17.412 2.419-6.252 4.079-13.398 4.57-23.858.472-10.486.595-13.828.595-40.525s-.123-30.047-.594-40.533c-.492-10.465-2.152-17.608-4.57-23.858-2.521-6.466-5.883-11.95-11.355-17.414-5.472-5.468-10.944-8.827-17.42-11.335-6.271-2.431-13.424-4.088-23.897-4.567-10.493-.477-13.834-.594-40.558-.594zm-8.825 17.715c2.62-.004 5.542 0 8.825 0 26.266 0 29.38.094 39.752.565 9.591.438 14.797 2.04 18.264 3.385 4.591 1.782 7.864 3.912 11.305 7.352 3.443 3.44 5.575 6.717 7.362 11.305 1.346 3.46 2.951 8.663 3.388 18.247.47 10.363.573 13.475.573 39.71 0 26.233-.102 29.346-.573 39.709-.44 9.584-2.042 14.786-3.388 18.247-1.783 4.587-3.919 7.854-7.362 11.292-3.443 3.441-6.712 5.57-11.305 7.352-3.463 1.352-8.673 2.95-18.264 3.388-10.37.47-13.486.573-39.752.573-26.268 0-29.38-.102-39.751-.573-9.592-.443-14.797-2.044-18.267-3.39-4.59-1.781-7.87-3.911-11.313-7.352-3.443-3.44-5.574-6.709-7.362-11.298-1.346-3.461-2.95-8.663-3.387-18.247-.472-10.363-.566-13.476-.566-39.726s.094-29.347.566-39.71c.438-9.584 2.04-14.786 3.387-18.25 1.783-4.588 3.919-7.865 7.362-11.305 3.443-3.441 6.722-5.57 11.313-7.357 3.468-1.351 8.675-2.949 18.267-3.389 9.075-.41 12.592-.532 30.926-.553zm61.337 16.322c-6.518 0-11.805 5.277-11.805 11.792 0 6.512 5.287 11.796 11.805 11.796 6.517 0 11.804-5.284 11.804-11.796 0-6.513-5.287-11.796-11.805-11.796zm-52.512 13.782c-27.9 0-50.519 22.603-50.519 50.482 0 27.879 22.62 50.471 50.52 50.471s50.51-22.592 50.51-50.471c0-27.879-22.613-50.482-50.513-50.482zm0 17.715c18.11 0 32.792 14.67 32.792 32.767 0 18.096-14.683 32.767-32.792 32.767-18.11 0-32.791-14.671-32.791-32.767 0-18.098 14.68-32.767 32.791-32.767z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 256 256">
      <path fill="#CB1F27" d="M0 128.002c0 52.414 31.518 97.442 76.619 117.239c-.36-8.938-.064-19.668 2.228-29.393c2.461-10.391 16.47-69.748 16.47-69.748s-4.089-8.173-4.089-20.252c0-18.969 10.994-33.136 24.686-33.136c11.643 0 17.268 8.745 17.268 19.217c0 11.704-7.465 29.211-11.304 45.426c-3.207 13.578 6.808 24.653 20.203 24.653c24.252 0 40.586-31.149 40.586-68.055c0-28.054-18.895-49.052-53.262-49.052c-38.828 0-63.017 28.956-63.017 61.3c0 11.152 3.288 19.016 8.438 25.106c2.368 2.797 2.697 3.922 1.84 7.134c-.614 2.355-2.024 8.025-2.608 10.272c-.852 3.242-3.479 4.401-6.409 3.204c-17.884-7.301-26.213-26.886-26.213-48.902c0-36.361 30.666-79.961 91.482-79.961c48.87 0 81.035 35.364 81.035 73.325c0 50.213-27.916 87.726-69.066 87.726c-13.819 0-26.818-7.47-31.271-15.955c0 0-7.431 29.492-9.005 35.187c-2.714 9.869-8.026 19.733-12.883 27.421a127.897 127.897 0 0 0 36.277 5.249c70.684 0 127.996-57.309 127.996-128.005C256.001 57.309 198.689 0 128.005 0C57.314 0 0 57.309 0 128.002" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
      <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 352.28 398.67">
      <path d="M137.17 156.98v-15.56c-5.34-.73-10.76-1.18-16.29-1.18C54.23 140.24 0 194.47 0 261.13c0 40.9 20.43 77.09 51.61 98.97-20.12-21.6-32.46-50.53-32.46-82.31 0-65.7 52.69-119.28 118.03-120.81Z" />
      <path d="M140.02 333c29.74 0 54-23.66 55.1-53.13l.11-263.2h48.08c-1-5.41-1.55-10.97-1.55-16.67h-65.67l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-9.24 0-17.95-2.31-25.61-6.34C105.3 323.9 121.6 333 140.02 333ZM333.13 106V91.37c-18.34 0-35.43-5.45-49.76-14.8 12.76 14.65 30.09 25.22 49.76 29.43Z" />
      <path d="M283.38 76.57c-13.98-16.05-22.47-37-22.47-59.91h-17.59c4.63 25.02 19.48 46.49 40.06 59.91ZM120.88 205.92c-30.44 0-55.21 24.77-55.21 55.21 0 21.2 12.03 39.62 29.6 48.86-6.55-9.08-10.45-20.18-10.45-32.2 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-67.05c-5.34-.73-10.76-1.18-16.29-1.18-.96 0-1.9.05-2.85.07v51.49c-5.16-1.61-10.61-2.55-16.29-2.55Z" />
      <path d="M333.13 106v51.04c-34.05 0-65.61-10.89-91.37-29.38v133.47c0 66.66-54.23 120.88-120.88 120.88-25.76 0-49.64-8.12-69.28-21.91 22.08 23.71 53.54 38.57 88.42 38.57 66.66 0 120.88-54.23 120.88-120.88V144.33c25.76 18.49 57.32 29.38 91.37 29.38v-65.68c-6.57 0-12.97-.71-19.14-2.03Z" />
      <path d="M241.76 261.13V127.66c25.76 18.49 57.32 29.38 91.37 29.38V106c-19.67-4.21-37-14.77-49.76-29.43-20.58-13.42-35.43-34.88-40.06-59.91h-48.08l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-18.42 0-34.72-9.1-44.75-23.01-17.57-9.25-29.6-27.67-29.6-48.86 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-51.49C71.83 158.5 19.14 212.08 19.14 277.78c0 31.78 12.34 60.71 32.46 82.31C71.23 373.87 95.12 382 120.88 382c66.65 0 120.88-54.23 120.88-120.88Z" fill="#fff" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Pinterest", href: "https://pinterest.com", icon: PinterestIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const pathname = usePathname();
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const footerColumns = [
    {
      title: t("col1Title"),
      links: [
        { label: t("col1Link1"), href: "#about" },
        { label: t("col1Link2"), href: "#why-reiseria" },
        { label: t("col1Link3"), href: "#how-it-works" },
        { label: t("col1Link4"), href: "#itinerary" },
      ],
    },
    {
      title: t("col2Title"),
      links: [
        { label: t("col2Link1"), href: "#destinations" },
        { label: t("col2Link2"), href: "#destinations" },
        { label: t("col2Link3"), href: "#destinations" },
        { label: t("col2Link4"), href: "#destinations" },
      ],
    },
    {
      title: t("col3Title"),
      links: [
        { label: t("col3Link1"), href: "mailto:hello@reiseria.com" },
        { label: t("col3Link2"), href: "#final-cta" },
        { label: t("col3Link3"), href: "#trust" },
        { label: t("col3Link4"), href: "#final-cta" },
      ],
    },
    {
      title: t("col4Title"),
      links: [
        { label: t("col4Link1"), href: "#" },
        { label: t("col4Link2"), href: "#" },
        { label: t("col4Link3"), href: "#" },
        { label: t("col4Link4"), href: "#" },
      ],
    },
  ];

  const trustBadges = [
    { label: t("badgeSecure"), icon: CreditCardIcon },
    { label: t("badgeConcierge"), icon: Clock3Icon },
    { label: t("badgeLogistics"), icon: ShieldCheckIcon },
    { label: t("badgePlanning"), icon: MapPinnedIcon },
  ];

  const currentLocale = pathname?.split("/")[1] || "en";
  const currentYear = 2026;
  const localizedPath = useMemo(() => {
    return (locale: string) => {
      const pathParts = pathname?.split("/") ?? ["", "en"];
      const nextPathParts = [...pathParts];
      nextPathParts[1] = locale;

      return nextPathParts.join("/") || `/${locale}`;
    };
  }, [pathname]);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus(t("newsletterSuccess"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#c4944a]/35 bg-[#0d2b1a] text-[#faf6ee]">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-16 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <span className="font-serif text-4xl font-semibold">Reiseria</span>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-[#faf6ee]/15 px-4 text-sm font-semibold text-[#faf6ee] transition-colors hover:bg-[#faf6ee]/10" onClick={scrollToTop} type="button">
                {t("backToTop")}
                <ArrowUpIcon className="size-4" />
              </button>
            </div>
            <p className="mt-5 max-w-md text-base leading-7 text-[#faf6ee]/72">
              {t("tagline")}
            </p>

            <form className="mt-8 max-w-md rounded-[22px] border border-[#faf6ee]/12 bg-[#faf6ee]/8 p-2" onSubmit={submitNewsletter}>
              <label className="sr-only" htmlFor="footer-newsletter">{t("newsletterLabel")}</label>
              <div className="flex gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[16px] bg-[#faf6ee] px-4 text-[#0d2b1a]">
                  <MailIcon className="size-4 shrink-0 text-[#1a5c38]" aria-hidden="true" />
                  <input aria-label={t("newsletterLabel")} className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#0d2b1a]/45" id="footer-newsletter" placeholder={t("newsletterPlaceholder")} required type="email" />
                </div>
                <button className="h-12 shrink-0 rounded-[16px] bg-[#c4944a] px-5 text-sm font-semibold text-[#0d2b1a] transition-colors hover:bg-[#d8aa61]" type="submit">{t("newsletterButton")}</button>
              </div>
              {newsletterStatus ? <p className="px-4 pt-3 text-sm text-[#faf6ee]/72">{newsletterStatus}</p> : null}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-9 sm:grid-cols-[1fr_1.2fr_1fr_1fr] lg:grid-cols-[9rem_10rem_9rem_9rem] lg:justify-end lg:gap-x-10">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-serif text-lg font-semibold text-[#faf6ee]">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a className="text-sm text-[#faf6ee]/64 transition-colors hover:text-[#faf6ee] sm:whitespace-nowrap" href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-[#faf6ee]/12 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-x-7 gap-y-4">
            {trustBadges.map(({ label, icon: Icon }) => (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#faf6ee]/78" key={label}>
                <Icon className="size-4 text-[#c4944a]" strokeWidth={1.7} />
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a aria-label={label} className="inline-flex size-9 items-center justify-center opacity-82 transition-opacity hover:opacity-100" href={href} key={label} rel="noreferrer" target="_blank">
                  <Icon className="size-6" />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 rounded-full border border-[#faf6ee]/12 p-1">
              {languages.map((language) => (
                <a aria-current={currentLocale === language.code ? "page" : undefined} className={["rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors", currentLocale === language.code ? "bg-[#faf6ee] text-[#0d2b1a]" : "text-[#faf6ee]/64 hover:text-[#faf6ee]"].join(" ")} href={localizedPath(language.code)} key={language.code} title={language.label}>
                  {language.code}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-[#faf6ee]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <p>{t("footerTagline")}</p>
        </div>
      </div>
    </footer>
  );
}
