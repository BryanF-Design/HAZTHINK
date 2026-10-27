"use client";

import { useT } from "@/lib/i18n";
import { serviceStyles } from "@/lib/site";
import ServiceArt from "../ui/ServiceArt";
import Split from "../Split";
import TransitionLink from "../TransitionLink";

const speeds = [0.08, -0.12, 0.16, -0.06, 0.1];

/** Parallax collage of concept pieces. */
export default function Showcase({ showMore = true }: { showMore?: boolean }) {
  const t = useT();
  return (
    <section className="sc container" aria-labelledby="sc-title">
      <div className="section-head">
        <p className="eyebrow" data-reveal>
          <span className="dot" />
          {t.showcase.eyebrow}
        </p>
        <h2 id="sc-title" className="h2" data-split>
          <Split text={t.showcase.title} />
        </h2>
        <p className="section-lead" data-reveal>
          {t.showcase.lead}
        </p>
      </div>
      <div className="sc-grid">
        {t.showcase.items.map((it, i) => (
          <figure key={i} className={`sc-item sc-item-${i}`} style={{ ["--c" as string]: serviceStyles[i].color }}>
            <div className="sc-media" data-clip>
              <div className="sc-art" data-speed={speeds[i]}>
                <ServiceArt kind={serviceStyles[i].art} />
              </div>
            </div>
            <figcaption>
              <span>
                {it.tag} · {t.common.concept}
              </span>
              <strong>{it.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
      {showMore && (
        <div className="sc-more" data-reveal>
          <TransitionLink href="/proyectos" className="btn btn-ghost">
            <span>{t.showcase.more}</span>
            <i aria-hidden="true">→</i>
          </TransitionLink>
        </div>
      )}
    </section>
  );
}
