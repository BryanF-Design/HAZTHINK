"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { site, wa } from "@/lib/site";
import Split from "../Split";
import Magnetic from "../Magnetic";
import WhatsAppIcon from "../WhatsAppIcon";

export default function Cta({ title, accent, lead }: { title?: string; accent?: string; lead?: string }) {
  const t = useT();
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Image className="cta-lotus" src="/brand/lotus-light.png" alt="" width={724} height={570} data-speed="0.25" />
      <div className="cta-inner container">
        <p className="eyebrow eyebrow-light" data-reveal>
          <span className="dot" />
          {t.cta.eyebrow}
        </p>
        <h2 id="cta-title" className="cta-title" data-split>
          <Split text={title ?? t.cta.title1} /> {accent !== "" && <Split text={accent ?? t.cta.accent} className="serif-accent" />}
        </h2>
        <p className="cta-lead" data-reveal>
          {lead ?? t.cta.lead}
        </p>
        <div className="cta-actions" data-reveal>
          <Magnetic strength={0.3}>
            <a className="btn btn-cream btn-lg" href={wa(t.cta.wa)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="btn-icon" />
              <span>{t.cta.button}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </Magnetic>
          <div className="cta-contacts">
            <a href={`tel:${site.phone}`}>
              <small>{t.cta.phone}</small>
              {site.phoneLabel}
            </a>
            <a href={`mailto:${site.email}`}>
              <small>{t.cta.email}</small>
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
