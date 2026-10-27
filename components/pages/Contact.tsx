"use client";

import { useT } from "@/lib/i18n";
import { site, wa } from "@/lib/site";
import PageHero from "./PageHero";
import Split from "../Split";
import Faq from "../home/Faq";
import WhatsAppIcon from "../WhatsAppIcon";

export default function Contact() {
  const t = useT();
  const c = t.contact;
  const methods = [
    { label: c.methods.wa, value: site.phoneLabel, href: wa(t.common.waDefault), color: "var(--green)", external: true, icon: <WhatsAppIcon /> },
    {
      label: c.methods.phone,
      value: site.phoneLabel,
      href: `tel:${site.phone}`,
      color: "var(--blue)",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
        </svg>
      ),
    },
    {
      label: c.methods.email,
      value: site.email,
      href: `mailto:${site.email}`,
      color: "var(--orange)",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
    {
      label: c.methods.fb,
      value: "/HAZTHINK",
      href: site.facebook,
      color: "var(--purple)",
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} color="var(--green)" word={c.eyebrow.toUpperCase()} />
      <section className="ct container" aria-labelledby="ct-title">
        <h2 id="ct-title" className="h2" data-split>
          <Split text={c.methodsTitle} />
        </h2>
        <div className="ct-grid" data-stagger>
          {methods.map((m) => (
            <a
              key={m.label}
              className="ct-card"
              href={m.href}
              style={{ ["--c" as string]: m.color }}
              {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="ct-icon">{m.icon}</span>
              <span className="ct-label">{m.label}</span>
              <strong>{m.value}</strong>
              <i className="ct-arrow" aria-hidden="true">
                ↗
              </i>
            </a>
          ))}
        </div>
      </section>

      <section className="ct-steps container" aria-labelledby="ct-steps-title">
        <h2 id="ct-steps-title" className="h3-title" data-reveal>
          {c.stepsTitle}
        </h2>
        <ol data-stagger>
          {c.steps.map((s, i) => (
            <li key={i}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="ct-location" data-reveal>
          <b>{c.location}</b> {c.locationText}
        </p>
      </section>
      <Faq />
    </>
  );
}
