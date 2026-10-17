import { useEffect, useRef, useState } from "react";

const THRESHOLD = 0.38;

export function ScratchCard({ onReveal, children }: { onReveal: () => void; children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const drawing = useRef(false);
  const done = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr; c.height = height * dpr;
    ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const foil = css.getPropertyValue("--scratch-foil").trim();
    const hi = css.getPropertyValue("--highlight").trim();
    const deep = css.getPropertyValue("--border").trim();
    const ink = css.getPropertyValue("--scratch-ink").trim();
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, deep); g.addColorStop(0.3, foil); g.addColorStop(0.5, hi); g.addColorStop(0.7, foil); g.addColorStop(1, deep);
    ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? hi : deep;
      ctx.globalAlpha = Math.random() * 0.25;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = ink;
    ctx.textAlign = "center";
    ctx.font = "500 11px Jost, sans-serif";
    ctx.fillText("R U B   T O   R E V E A L", width / 2, height / 2 + 4);
  }, []);

  const reveal = () => {
    if (done.current) return;
    done.current = true;
    setRevealed(true);
    onReveal();
    setTimeout(() => setGone(true), 900);
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || done.current) return;
    const c = e.currentTarget, ctx = c.getContext("2d")!;
    const r = c.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, Math.PI * 2); ctx.fill();
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0, n = 0;
    for (let i = 3; i < data.length; i += 64) { n++; if (data[i] === 0) clear++; }
    if (clear / n >= THRESHOLD) reveal();
  };

  return (
    <div className="relative mx-auto w-[min(340px,86vw)]">
      <div aria-live="polite">{revealed ? children : <div className="invisible">{children}</div>}</div>
      {!gone && (
        <canvas
          ref={canvasRef}
          role="button"
          tabIndex={0}
          aria-label="Gold foil. Rub to reveal the date, or press Enter"
          className={`absolute inset-0 h-full w-full cursor-grab touch-none rounded-sm transition-opacity duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft ${revealed ? "opacity-0" : "opacity-100"}`}
          onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
          onPointerMove={scratch}
          onPointerUp={() => (drawing.current = false)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); } }}
        />
      )}
    </div>
  );
}
