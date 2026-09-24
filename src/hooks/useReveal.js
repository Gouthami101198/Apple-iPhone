import { useEffect, useRef, useState } from 'react';

/**
 * Reusable scroll-reveal hook. Attaches an IntersectionObserver to the
 * returned ref and flips `visible` to true once the element enters the
 * viewport. Used to drive the `.reveal` / `.is-visible` fade-up animation
 * across the whole site.
 */
export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Runs exactly once per mounted element. Passing an inline options object
  // to useEffect's dependency array would make it re-run on every render
  // (a new {} is a new reference each time), tearing down and rebuilding
  // the observer mid-scroll and losing intersections — so this intentionally
  // takes no reactive dependencies beyond mount.
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // If the element is already on screen at mount time (e.g. above-the-fold
    // content, or a fast/instant scroll in automated tests), show it right
    // away instead of waiting on an observer callback that may never land
    // between two rapid frames.
    const rect = node.getBoundingClientRect();
    const already = rect.top < window.innerHeight && rect.bottom > 0;
    if (already) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}
