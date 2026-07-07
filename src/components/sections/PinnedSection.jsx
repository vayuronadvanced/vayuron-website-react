{/*PinnedSection.jsx*/}

import { useScrollPin } from "../../hooks/useScrollPin";

export default function PinnedSection({ children, animation }) {
  const sectionRef = useScrollPin((tl, el) => {
    if (typeof animation === "function") {
      animation(tl, el);
    }
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen">
      {children}
    </section>
  );
}