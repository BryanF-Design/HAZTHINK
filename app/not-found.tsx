import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf container">
      <p className="eyebrow">
        <span className="dot" />
        404
      </p>
      <h1 className="h2">Esta idea aún no existe.</h1>
      <p className="section-lead">La página que buscas no está aquí. / This page doesn&apos;t exist.</p>
      <Link className="btn btn-ink" href="/">
        <span>Volver al inicio / Home</span>
        <i aria-hidden="true">←</i>
      </Link>
    </section>
  );
}
