"use client";

import { wa } from "@/lib/site";
import { useT } from "@/lib/i18n";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat() {
  const t = useT();
  return (
    <a className="wa-float" href={wa(t.common.waDefault)} target="_blank" rel="noopener noreferrer" aria-label={t.common.waAria} data-cursor="Chat">
      <WhatsAppIcon />
      <span>{t.common.quoteShort}</span>
    </a>
  );
}
