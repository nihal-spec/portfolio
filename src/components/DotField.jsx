import { useEffect, useRef } from "react";

/*
  A quiet grid of dots that swells and warms toward the pointer, with a slow
  ambient ripple when idle. Pauses off-screen; renders a single static frame
  when the visitor prefers reduced motion.
*/
export default function DotField({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const GAP = 26;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        dot: styles.getPropertyValue("--dot").trim() || "rgba(255,255,255,.14)",
        accent: styles.getPropertyValue("--accent-rgb").trim() || "255, 90, 54",
      };
    };
    let colors = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      const t = time * 0.0006;
      const radius = Math.min(260, width * 0.35);

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const near = Math.max(0, 1 - dist / radius);
          const wave = reducedMotion ? 0 : (Math.sin(x * 0.012 + t) + Math.cos(y * 0.014 - t * 0.8)) * 0.25 + 0.5;
          const size = 0.9 + near * near * 2.4 + wave * 0.35;
          if (near > 0.02) {
            ctx.fillStyle = `rgba(${colors.accent}, ${0.15 + near * 0.75})`;
          } else {
            ctx.fillStyle = colors.dot;
          }
          ctx.beginPath();
          ctx.arc(
            x + (near ? (dx / (dist || 1)) * near * 6 : 0),
            y + (near ? (dy / (dist || 1)) * near * 6 : 0),
            size,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      if (!reducedMotion && visible) frame = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      if (reducedMotion) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        draw(0);
      }
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    });
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reducedMotion) draw(0);
    });

    resize();
    draw(0);
    visibility.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onResize = () => {
      resize();
      draw(0);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
