"use client";

import { useT } from "@/lib/i18n";
import PageHero from "./PageHero";
import Split from "../Split";
import Marquee from "../home/Marquee";
import Process from "../home/Process";
import Cta from "../home/Cta";

const colors = ["var(--blue)", "var(--green)", "var(--orange)", "var(--purple)", "var(--yellow)"];

export default function About() {
  const t = useT();
  const a = t.about;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={a.lead} color="var(--blue)" word={a.eyebrow.toUpperCase()} />

      <section className="story container" aria-labelledby="story-title">
        <div className="story-head">
          <p className="eyebrow" data-reveal>
            <span className="dot" />
            {a.storyEyebrow}
          </p>
          <h2 id="story-title" className="h2" data-split>
            <Split text={a.storyTitle} />
          </h2>
        </div>
        <div className="story-body" data-stagger>
          {a.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="facts" data-stagger>
          {a.facts.map((f, i) => (
            <div key={i} className="fact" style={{ ["--c" as string]: colors[i] }}>
              <b>{f.big}</b>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Marquee />

      <section className="pillars container" aria-labelledby="pillars-title">
        <p className="eyebrow" data-reveal>
          <span className="dot" />
          {a.pillarsEyebrow}
        </p>
        <h2 id="pillars-title" className="h2" data-split>
          <Split text={a.pillarsTitle} />
        </h2>
        <div className="pillar-grid" data-stagger>
          {a.pillars.map((p, i) => (
            <article key={i} className="pillar" style={{ ["--c" as string]: colors[i] }}>
              <span className="pillar-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Process />

      <section className="values container" aria-labelledby="values-title">
        <div>
          <p className="eyebrow" data-reveal>
            <span className="dot" />
            {a.valuesEyebrow}
          </p>
          <h2 id="values-title" className="h2" data-split>
            <Split text={a.valuesTitle} />
          </h2>
        </div>
        <ul className="value-list" data-stagger>
          {a.values.map((v, i) => (
            <li key={i} style={{ ["--c" as string]: colors[i + 1] }}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}
