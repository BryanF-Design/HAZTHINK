"use client";

import { useT } from "@/lib/i18n";

export default function SkipLink() {
  const t = useT();
  return (
    <a className="skip-link" href="#contenido">
      {t.common.skip}
    </a>
  );
}
