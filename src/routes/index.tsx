import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import sealedImg from "@/assets/sealed-backdrop.jpg";
import heroImg from "@/assets/hero-backdrop.jpg";
import sealImg from "@/assets/wax-seal.png";
import paperImg from "@/assets/paper-texture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import { Divider, Framed, Heading, Section } from "@/components/invite/ornaments";
import { ScratchCard } from "@/components/invite/ScratchCard";
import { EVENTS, WEDDING, timeLeft } from "@/lib/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Anaya — 14 February 2027 | Wedding Invitation" },
      { name: "description", content: "You are invited to the wedding of Aarav & Anaya at The Grand Pavilion, 14 February 2027." },
      { property: "og:title", content: "Aarav & Anaya — Wedding Invitation" },
      { property: "og:description", content: "Join us under the full moon at The Grand Pavilion, 14 February 2027." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Invitation() {
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("sealed");
  const [petals, setPetals] = useState(false);
  const sealSound = useRef<HTMLAudioElement>(null);
  const music = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.classList.toggle("is-sealed", stage !== "open");
    return () => document.body.classList.remove("is-sealed");
  }, [stage]);

  const open = () => {
    if (stage !== "sealed") return;
    const m = music.current, s = sealSound.current;
    if (s) { s.volume = 0.8; s.play().catch(() => {}); }
    if (m) {
      m.muted = true; m.volume = 0;
      m.play().then(() => {
        m.muted = false;
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 8000);
          m.volume = 0.6 * k;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }).catch(() => {});
    }
    setStage("opening");
    setTimeout(() => setStage("open"), reducedMotion() ? 50 : 6000);
  };

  const celebrate = async () => {
    if (!reducedMotion()) {
      const confetti = (await import("canvas-confetti")).default;
      const css = getComputedStyle(document.documentElement);
      const colors = ["--accent", "--accent-soft", "--highlight", "--scratch-foil"].map((v) => css.getPropertyValue(v).trim());
      const base = { particleCount: 70, spread: 60, startVelocity: 55, colors, scalar: 0.9, ticks: 220 };
      confetti({ ...base, angle: 60, origin: { x: 0, y: 0.7 } });
      confetti({ ...base, angle: 120, origin: { x: 1, y: 0.7 } });
    }
    setTimeout(() => setPetals(true), 1400);
  };

  const isOpen = stage !== "sealed";

  return (
    <main className={`${isOpen ? "is-open" : ""} bg-background`} style={{ ["--paper-img" as string]: `url(${paperImg})` }}>
      <audio ref={sealSound} src="/audio/seal.mp3" preload="auto" />
      <audio ref={music} src="/audio/music.mp3" preload="auto" loop />

      {/* HERO + CURTAINS — one continuous scene */}
      <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
        <div className="hero-scene absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_30%,var(--background)_105%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow reveal-up" style={{ transitionDelay: "2.2s" }}>Together with their families</p>
          <h1 className="reveal-up mt-6 font-display text-6xl italic leading-[0.95] text-gold shimmer sm:text-8xl 2xl:text-9xl" style={{ transitionDelay: "2.8s" }}>
            {WEDDING.groom}
            <span className="block py-2 font-display text-3xl not-italic text-accent-soft sm:text-4xl">&amp;</span>
            {WEDDING.bride}
          </h1>
          <p className="reveal-up mt-6 max-w-sm font-display text-lg italic text-foreground/85 sm:text-xl" style={{ transitionDelay: "3.6s" }}>
            request the honour of your presence as they begin forever under the full moon
          </p>
          <div className="reveal-up mt-10" style={{ transitionDelay: "4.4s" }}>
            <ScratchCard onReveal={celebrate}>
              <div className="jewel-frame px-6 py-5 text-center">
                <p className="eyebrow">Save the date</p>
                <p className="mt-2 font-display text-2xl text-highlight sm:text-3xl">{WEDDING.dateLabel}</p>
                <p className="mt-1 text-sm tracking-[0.2em] text-accent-soft">{WEDDING.timeLabel}</p>
              </div>
            </ScratchCard>
          </div>
          <p className="reveal-up eyebrow absolute bottom-6 opacity-70" style={{ transitionDelay: "5.4s" }}>Scroll ↓</p>
        </div>

        {/* Curtains */}
        <div className={`fixed inset-0 z-50 ${stage === "open" ? "pointer-events-none" : ""}`} aria-hidden={isOpen}>
          <button
            type="button"
            onClick={open}
            disabled={isOpen}
            aria-label={`Open the invitation of ${WEDDING.groom} and ${WEDDING.bride}`}
            className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none"
          >
            <div className="curtain curtain--l"><div className="curtain__img" style={{ backgroundImage: `url(${sealedImg})` }} /></div>
            <div className="curtain curtain--r"><div className="curtain__img" style={{ backgroundImage: `url(${sealedImg})` }} /></div>
            <div className={`seal ${!isOpen ? "seal-breathe" : ""} absolute left-1/2 top-[46%] w-[clamp(120px,22vmin,220px)] -translate-x-1/2 -translate-y-1/2`}>
              <img src={sealImg} alt="" width={816} height={816} className="w-full drop-shadow-[0_14px_20px_var(--background)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(1.2rem,4vmin,2.2rem)] italic text-gold">{WEDDING.initials}</span>
            </div>
            <div className={`absolute inset-x-0 bottom-[7%] flex flex-col items-center transition-opacity duration-700 ${isOpen ? "opacity-0" : "opacity-100"}`}>
              <span className="jewel-frame eyebrow px-6 py-2.5">Tap to open</span>
              <span className="mt-4 font-display text-3xl italic text-gold drop-shadow-[0_2px_6px_var(--background)] sm:text-4xl">{WEDDING.groom} &amp; {WEDDING.bride}</span>
            </div>
          </button>
        </div>
      </section>

      <div className="paper-ground relative">
        <Divider className="pt-16" />
        <Families />
        <Divider />
        <Venue />
        <Divider />
        <Countdown />
        <Divider />
        <Programme />
        <Divider />
        <Gallery />
        <Divider />
        <Blessing />
        <Divider />
        <Travel />
        <Divider />
        <Rsvp />
        <Divider />
        <Closing />
      </div>

      {petals && <Petals />}
    </main>
  );
}

function Families() {
  const side = (title: string, child: string, parents: string, grand: string) => (
    <div className="text-center">
      <p className="eyebrow">{title}</p>
      <p className="mt-3 font-display text-3xl italic text-highlight">{child}</p>
      <p className="mt-4 text-sm text-muted">Beloved son / daughter of</p>
      <p className="mt-1 font-display text-xl text-foreground">{parents}</p>
      <p className="mt-4 text-sm text-muted">Grandchild of</p>
      <p className="mt-1 font-display text-lg text-foreground/90">{grand}</p>
    </div>
  );
  return (
    <Section id="families">
      <Framed>
        <Heading eyebrow="With blessings of" title="Our Families" />
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
          {side("The Groom", "Aarav Mehra", "Mr. Rajiv & Mrs. Sunita Mehra", "Late Shri Harish & Smt. Kamla Mehra")}
          {side("The Bride", "Anaya Kapoor", "Mr. Vikram & Mrs. Meera Kapoor", "Shri Om Prakash & Smt. Savitri Kapoor")}
        </div>
      </Framed>
    </Section>
  );
}

function Venue() {
  return (
    <Section id="venue">
      <Framed className="text-center">
        <Heading eyebrow="Where" title="The Venue" />
        <p className="font-display text-3xl text-highlight sm:text-4xl">{WEDDING.venue}</p>
        <p className="mt-3 text-muted">{WEDDING.venueAddress}</p>
        <a href={WEDDING.mapUrl} target="_blank" rel="noreferrer" className="eyebrow mt-8 inline-block border border-accent px-8 py-3 transition-colors hover:bg-accent hover:text-background">
          Open in Maps
        </a>
      </Framed>
    </Section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const t = now === null ? null : timeLeft(WEDDING.dateISO, now);
  const units: [string, number | undefined][] = [["Days", t?.days], ["Hours", t?.hours], ["Minutes", t?.minutes], ["Seconds", t?.seconds]];
  return (
    <Section id="countdown">
      <Framed>
        <Heading eyebrow="Counting the moons" title="Until We Wed" />
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {units.map(([l, v]) => (
            <div key={l} className="border border-accent/40 bg-paper-dark/50 py-4 text-center sm:py-6">
              <p className="font-display text-3xl tabular-nums text-gold sm:text-5xl">{v === undefined ? "--" : String(v).padStart(2, "0")}</p>
              <p className="mt-1 text-[0.55rem] uppercase tracking-[0.25em] text-muted sm:text-xs">{l}</p>
            </div>
          ))}
        </div>
      </Framed>
    </Section>
  );
}

function Programme() {
  return (
    <Section id="programme">
      <Heading eyebrow="The celebrations" title="Programme" />
      <div className="grid gap-6 sm:grid-cols-2">
        {EVENTS.map((e) => (
          <Framed key={e.name} className="text-center">
            <p className="eyebrow">{e.day}</p>
            <h3 className="mt-3 font-display text-4xl italic text-gold">{e.name}</h3>
            <div className="mx-auto my-4 h-px w-16 bg-accent/60" />
            <p className="font-display text-xl text-highlight"><time dateTime={e.iso}>{e.time} IST</time></p>
            <p className="mt-1 text-sm text-muted">{e.place}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent-soft">Dress code</p>
            <p className="mt-1 font-display text-lg italic text-foreground">{e.dress}</p>
          </Framed>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const imgs = [[g1, "Marigold garlands and brass lamps on marble steps"], [g2, "A peacock on a moonlit palace balcony"], [g3, "Henna-adorned hands holding a lotus"]] as const;
  return (
    <Section id="gallery">
      <Heading eyebrow="Moments" title="Gallery" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {imgs.map(([src, alt], i) => (
          <figure key={alt} className={`jewel-frame overflow-hidden p-2 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
            <img src={src} alt={alt} loading="lazy" width={768} height={1024} className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Blessing() {
  return (
    <Section id="blessing">
      <Framed className="text-center">
        <Heading eyebrow="A blessing" title="Saptapadi" />
        <blockquote className="mx-auto max-w-xl font-display text-2xl italic leading-relaxed text-highlight sm:text-3xl">
          “With seven steps we become friends. May I attain your friendship, and may I never be separated from it.”
        </blockquote>
        <p className="eyebrow mt-6">— Rig Veda</p>
      </Framed>
    </Section>
  );
}

function Travel() {
  const items = [
    ["By air", "Maharana Pratap Airport (UDR) is 25 minutes away. Shuttles meet every arriving flight on 12–13 February."],
    ["Stay", "Rooms are held for guests at The Grand Pavilion and Lakeside Haveli. Quote “Aarav & Anaya” when booking."],
    ["Getting around", "Boats and cars run between venues throughout the celebrations. Ask the concierge desk in the lobby."],
  ];
  return (
    <Section id="travel">
      <Framed>
        <Heading eyebrow="For our guests" title="Travel & Stay" />
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map(([t, d]) => (
            <div key={t} className="text-center">
              <p className="font-display text-2xl italic text-gold">{t}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{d}</p>
            </div>
          ))}
        </div>
      </Framed>
    </Section>
  );
}

function Rsvp() {
  const [sent, setSent] = useState(false);
  const field = "w-full border-b border-accent/50 bg-transparent px-1 py-3 text-foreground placeholder:text-muted focus:border-accent-soft focus:outline-none";
  return (
    <Section id="rsvp">
      <Framed>
        <Heading eyebrow="Kindly reply by 10 January" title="RSVP" />
        {sent ? (
          <p className="text-center font-display text-2xl italic text-highlight">Thank you — we cannot wait to celebrate with you.</p>
        ) : (
          <form className="mx-auto grid max-w-md gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required name="name" placeholder="Your name" aria-label="Your name" className={field} />
            <input name="guests" type="number" min={1} max={8} defaultValue={1} aria-label="Number of guests" className={field} />
            <select name="attending" aria-label="Attending" className={`${field} [&>option]:bg-surface`}>
              <option>Joyfully accepts</option>
              <option>Regretfully declines</option>
            </select>
            <textarea name="note" rows={3} placeholder="A note for the couple" aria-label="Note" className={field} />
            <button type="submit" className="eyebrow mt-4 bg-accent px-8 py-4 text-background transition-colors hover:bg-accent-soft">Send reply</button>
          </form>
        )}
      </Framed>
    </Section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--paper)_0%,transparent_40%,var(--background)_100%)]" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <img src={sealImg} alt="" width={816} height={816} loading="lazy" className="w-24 opacity-90" />
        <p className="eyebrow mt-8">With love</p>
        <p className="mt-4 font-display text-5xl italic text-gold shimmer sm:text-6xl">{WEDDING.groom} &amp; {WEDDING.bride}</p>
        <p className="mt-4 font-display text-xl text-foreground/80">{WEDDING.dateLabel} · {WEDDING.venue}</p>
      </div>
    </section>
  );
}

function Petals() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i * 1.3) % 14}s`,
    dur: `${12 + ((i * 7) % 10)}s`,
    drift: `${((i % 5) - 2) * 40}px`,
    scale: 0.6 + ((i * 13) % 10) / 15,
  }));
  return (
    <div aria-hidden>
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, ["--drift" as string]: p.drift, scale: String(p.scale) }} />
      ))}
    </div>
  );
}
