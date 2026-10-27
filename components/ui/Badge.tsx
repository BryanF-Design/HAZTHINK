import Image from "next/image";

/** Rotating circular sticker with the lotus in the middle. */
export default function Badge({ text, className = "" }: { text: string; className?: string }) {
  const id = `badge-${text.length}`;
  return (
    <div className={`badge ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="badge-ring">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="470">
            {text.toUpperCase().repeat(2)}
          </textPath>
        </text>
      </svg>
      <Image className="badge-lotus" src="/brand/lotus.png" alt="" width={120} height={94} />
    </div>
  );
}
