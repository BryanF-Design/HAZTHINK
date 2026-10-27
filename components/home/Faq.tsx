"use client";

import { useState } from "react";
import Image from "next/image";
import { useT } from "@/lib/i18n";
import Split from "../Split";

export default function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq container" aria-labelledby="faq-title">
      <div className="faq-side">
        <p className="eyebrow" data-reveal>
          <span className="dot" />
          {t.faq.eyebrow}
        </p>
        <h2 id="faq-title" className="h2" data-split>
          <Split text={t.faq.title} />
        </h2>
        <p className="section-lead" data-reveal>
          {t.faq.lead}
        </p>
        <Image className="faq-lotus" src="/brand/lotus.png" alt="" width={360} height={283} data-rotate="25" />
      </div>
      <div className="faq-list" data-stagger>
        {t.faq.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
