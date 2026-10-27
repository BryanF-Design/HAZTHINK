import { Fragment } from "react";

type Props = {
  text: string;
  by?: "chars" | "words";
  className?: string;
};

/**
 * Renders text as masked words (and optionally chars) for GSAP reveals,
 * while keeping one readable copy for assistive tech.
 */
export default function Split({ text, by = "chars", className = "" }: Props) {
  const words = text.split(" ");
  return (
    <span key={text} className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="w">
              {by === "chars" ? (
                Array.from(word).map((ch, ci) => (
                  <span key={ci} className="c">
                    {ch}
                  </span>
                ))
              ) : (
                <span className="c">{word}</span>
              )}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
