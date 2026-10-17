import type { ReactNode } from "react";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center text-accent ${className}`} aria-hidden>
      <svg viewBox="0 0 320 40" className="h-8 w-[min(320px,80vw)]" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M4 20h110M206 20h110" />
        <path d="M30 20c20-10 40-10 60 0-20 10-40 10-60 0z" opacity=".7" />
        <path d="M230 20c20-10 40-10 60 0-20 10-40 10-60 0z" opacity=".7" />
        <path d="M160 4c10 8 14 12 14 16s-4 8-14 16c-10-8-14-12-14-16s4-8 14-16z" fill="currentColor" fillOpacity=".15" />
        <circle cx="160" cy="20" r="3.5" fill="currentColor" />
        <path d="M120 20c8-8 18-8 26 0M200 20c-8-8-18-8-26 0M120 20c8 8 18 8 26 0M200 20c-8 8-18 8-26 0" />
        <circle cx="114" cy="20" r="1.6" fill="currentColor" /><circle cx="206" cy="20" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`absolute h-12 w-12 text-accent sm:h-16 sm:w-16 ${className}`} fill="none" stroke="currentColor" strokeWidth="0.9" aria-hidden>
      <path d="M4 76V20Q4 4 20 4h56" />
      <path d="M12 76V28q0-16 16-16h48" opacity=".5" />
      <path d="M22 22c10 0 16 6 16 16-10 0-16-6-16-16z" fill="currentColor" fillOpacity=".2" />
      <path d="M22 22c12-6 22-4 30 4M22 22c-6 12-4 22 4 30" />
      <circle cx="22" cy="22" r="2.4" fill="currentColor" />
      <circle cx="56" cy="8" r="1.4" fill="currentColor" /><circle cx="8" cy="56" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Framed({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`jewel-frame px-6 py-12 sm:px-12 sm:py-16 ${className}`}>
      <Corner className="left-2 top-2" />
      <Corner className="right-2 top-2 -scale-x-100" />
      <Corner className="bottom-2 left-2 -scale-y-100" />
      <Corner className="bottom-2 right-2 -scale-100" />
      {children}
    </div>
  );
}

export function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-10 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <div className="mx-auto mt-4 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-accent/70 sm:w-20" />
        <h2 className="font-display text-4xl italic text-gold shimmer sm:text-5xl">{title}</h2>
        <span className="h-px w-10 bg-accent/70 sm:w-20" />
      </div>
    </header>
  );
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:py-24 2xl:max-w-5xl">
      {children}
    </section>
  );
}
