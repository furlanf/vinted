import { useEffect, useState, useRef, RefObject } from "react";

const useIntersectionObserver = (ref: RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );
  }, []);

  useEffect(() => {
    if (ref.current) {
      observerRef.current?.observe(ref.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export default useIntersectionObserver;
