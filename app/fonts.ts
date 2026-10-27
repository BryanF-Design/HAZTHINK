import { Atkinson_Hyperlegible, Bricolage_Grotesque, Instrument_Serif, Manrope } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const readable = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-readable",
  display: "swap",
  preload: false,
});
