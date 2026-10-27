"use client";

import { useLang } from "@/lib/i18n";
import { legal } from "@/lib/legal";
import PageHero from "./PageHero";
import TransitionLink from "../TransitionLink";

export default function Legal({ doc }: { doc: "terms" | "privacy" }) {
  const { lang, t } = useLang();
  const d = legal[doc][lang];
  return (
    <>
      <PageHero eyebrow={t.footer.legal} title={d.title} lead={d.intro} color={doc === "terms" ? "var(--purple)" : "var(--blue)"} word="LEGAL" />
      <article className="legal container">
        <p className="legal-updated">{t.legal.updated}</p>
        {d.blocks.map((b) => (
          <section key={b.h} data-reveal>
            <h2>{b.h}</h2>
            {b.p?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {b.ul && (
              <ul>
                {b.ul.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {b.after && <p>{b.after}</p>}
          </section>
        ))}
        <TransitionLink href="/" className="btn btn-ink">
          <span>{t.legal.back}</span>
          <i aria-hidden="true">←</i>
        </TransitionLink>
      </article>
    </>
  );
}
