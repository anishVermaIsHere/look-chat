import { useEffect, useRef } from "react";

const DEFAULT_COLORS = ["#f2f2f2"];

export default function BubblesAnimation({
  density = 0.00012,
  colors = DEFAULT_COLORS,
  minRadius = 0.6,
  maxRadius = 1.8,
  twinkleSpeed = 0.02,
  driftSpeed = 0.15, // pixels per frame — set to 0 to disable drift
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    let dots = [];
    let rafId = null;
    let cancelled = false; // guards against StrictMode double-invoke races

    function seedDots(width, height) {
      const safeW = Math.max(width, 1);
      const safeH = Math.max(height, 1);
      const count = Math.max(10, Math.floor(safeW * safeH * density));
      const arr = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        arr.push({
          x: Math.random() * safeW,
          y: Math.random() * safeH,
          vx: Math.cos(angle) * driftSpeed * (0.3 + Math.random() * 0.7),
          vy: Math.sin(angle) * driftSpeed * (0.3 + Math.random() * 0.7),
          r: minRadius + Math.random() * (maxRadius - minRadius),
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          speed: twinkleSpeed * (0.5 + Math.random()),
          baseAlpha: 0.35 + Math.random() * 0.5,
        });
      }
      dots = arr;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth || 1;
      const height = parent.clientHeight || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedDots(width, height);
    }

    function draw() {
      if (cancelled) return;

      const width = parent.clientWidth || 1;
      const height = parent.clientHeight || 1;
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        // twinkle
        dot.phase += dot.speed;
        const twinkle = (Math.sin(dot.phase) + 1) / 2;
        const alpha = dot.baseAlpha * (0.4 + 0.6 * twinkle);

        // drift, wrapping around edges
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < -5) dot.x = width + 5;
        if (dot.x > width + 5) dot.x = -5;
        if (dot.y < -5) dot.y = height + 5;
        if (dot.y > height + 5) dot.y = -5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    }

    resize();
    rafId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      if (!cancelled) resize();
    });
    ro.observe(parent);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [density, colors, minRadius, maxRadius, twinkleSpeed, driftSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}