"use client";

import { useEffect, useRef } from "react";

// Cancels the "bob" of `position: fixed; bottom: 0` elements on iOS/Android
// as the browser's address bar collapses/expands during scroll. The
// browser already re-tracks fixed elements against the visual viewport as
// that happens, but on its own internal cadence — which visibly lags when
// the main thread is busy (e.g. Lenis's scroll RAF loop). This mirrors the
// OS's own `visualViewport` measurements into a GPU-composited transform
// every frame instead, so the element reads as pinned rather than trailing.
//
// No-ops (leaves the element on plain CSS `fixed bottom-0`) when
// `visualViewport` isn't supported — every current mobile browser has it,
// but this keeps the element correctly positioned either way.
export function useVisualViewportBottomOffset<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const vv = window.visualViewport;
    if (!el || !vv) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      // Gap between the layout viewport's bottom and the visual viewport's
      // bottom: ~0 most of the time, non-zero mid-toolbar-transition or
      // while an on-screen keyboard is open.
      const offset = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    schedule();
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);
    return () => {
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
