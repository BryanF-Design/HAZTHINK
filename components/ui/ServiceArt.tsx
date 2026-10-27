"use client";

import Image from "next/image";
import type { ArtKind } from "@/lib/site";
import { useT } from "@/lib/i18n";

/** Illustrative CSS mockups for each service (concept art, not client work). */
export default function ServiceArt({ kind }: { kind: ArtKind }) {
  const a = useT().services.art;
  switch (kind) {
    case "social":
      return (
        <div className="art art-social" aria-hidden="true">
          <div className="phone">
            <div className="phone-top">
              <i />
              <span>hazthink</span>
            </div>
            <div className="phone-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className={`tile tile-${i % 5}`}>
                  {i === 4 ? a.feed : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="float-card fc-like">♥ 1.2k</div>
          <div className="float-card fc-story">
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case "print":
      return (
        <div className="art art-print" aria-hidden="true">
          <div className="banner">
            <span className="banner-eyelet" />
            <span className="banner-eyelet r" />
            <b>{a.banner}</b>
            <small>{a.bannerSub}</small>
            <span className="banner-sun" />
          </div>
          <div className="banner-legs">
            <i />
            <i />
          </div>
          <div className="crop-marks">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case "brand":
      return (
        <div className="art art-brand" aria-hidden="true">
          <div className="card card-back" />
          <div className="card card-front">
            <Image src="/brand/lotus.png" alt="" width={140} height={110} />
            <span>HAZTHINK</span>
          </div>
          <div className="swatches">
            {["#1f8ae2", "#4cb85a", "#dfe04a", "#f39230", "#9b2ab3"].map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
          <div className="type-spec">Aa</div>
        </div>
      );
    case "ads":
      return (
        <div className="art art-ads" aria-hidden="true">
          <div className="poster">
            <span className="poster-burst">-30%</span>
            <b>{a.ads}</b>
            <small>{a.adsSub}</small>
            <span className="poster-bars">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="poster poster-small">
            <b>%</b>
          </div>
        </div>
      );
    case "invite":
      return (
        <div className="art art-invite" aria-hidden="true">
          <div className="envelope">
            <div className="env-flap" />
          </div>
          <div className="invite-card">
            <small>{a.inviteSub}</small>
            <b>{a.invite}</b>
            <span className="invite-date">12 · 12</span>
            <span className="invite-leaf l" />
            <span className="invite-leaf r" />
          </div>
        </div>
      );
  }
}
