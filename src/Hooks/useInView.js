import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const { threshold = 0.2, root = null, rootMargin = "0px", once = true } = options;
  const elementRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (once && inView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, once, root, rootMargin, threshold]);

  return { ref: elementRef, inView };
}
