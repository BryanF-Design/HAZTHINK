"use client";

import { useT } from "@/lib/i18n";
import { serviceStyles, wa } from "@/lib/site";
import PageHero from "./PageHero";
import ServiceArt from "../ui/ServiceArt";
import Showcase from "../home/Showcase";
import Cta from "../home/Cta";

export default function Projects() {
  const t = useT();
  const p = t.projects;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} color="var(--orange)" word={p.eyebrow.toUpperCase()} />
      <p className="concept-note container" data-reveal>
        <i aria-hidden="true">i</i> {p.note}
      </p>
      <section className="pj container" aria-label={p.eyebrow}>
        {p.list.map((item, i) => {
          const st = serviceStyles[i];
          return (
            <article key={i} className={`pj-item${i % 2 ? " is-flip" : ""}`} style={{ ["--c" as string]: st.color, ["--fg" as string]: st.ink }}>
              <div className="pj-media" data-clip>
                <div className="pj-art" data-speed="0.1">
                  <ServiceArt kind={st.art} />
                </div>
                <span className="pj-badge">{t.common.concept}</span>
              </div>
              <div className="pj-copy" data-reveal>
                <span className="pj-num">0{i + 1}</span>
                <span className="pj-tag">{item.tag}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <a className="link-arrow" href={wa(`${t.common.waDefault} (${item.tag})`)} target="_blank" rel="noopener noreferrer">
                  {t.services.cta} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </section>
      <Showcase showMore={false} />
      <Cta title={p.ctaTitle} accent="" lead={p.ctaLead} />
    </>
  );
}
