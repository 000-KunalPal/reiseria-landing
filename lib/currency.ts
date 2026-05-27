const RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.37,
};

const SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
};

export function formatPrice(translatedPrice: string, targetCurrency: string, locale: string): string {
  // If targetCurrency is USD, return the translatedPrice as is
  if (targetCurrency === "USD") return translatedPrice;

  // Find digit sequences possibly separated by commas, periods, or spaces.
  const match = translatedPrice.match(/[\d][\d\s.,]*/);
  if (!match) return translatedPrice;

  const numStr = match[0].trim();
  // Clean it to parse as number — strip all separators
  const cleanNumStr = numStr.replace(/[\s.,]/g, "");
  const basePrice = parseInt(cleanNumStr, 10);
  if (isNaN(basePrice)) return translatedPrice;

  // Convert price and round to the nearest 10
  const convertedPrice = Math.round((basePrice * (RATES[targetCurrency] || 1)) / 10) * 10;

  // Format the number based on locale
  let formattedNumber = "";
  if (locale === "de" || locale === "it") {
    formattedNumber = convertedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else if (locale === "fr") {
    formattedNumber = convertedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else {
    formattedNumber = convertedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const symbol = SYMBOLS[targetCurrency] || targetCurrency;

  // Replace "USD" with the symbol and the number with the converted number
  let result = translatedPrice.replace("USD", symbol);
  result = result.replace(numStr, formattedNumber);
  return result;
}
