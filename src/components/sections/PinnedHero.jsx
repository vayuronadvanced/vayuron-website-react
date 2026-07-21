{/*PinnedHero.jsx*/}

import PropTypes from 'prop-types';
import { useScrollPin } from '../../hooks/useScrollPin';

/**
 * Full-viewport hero that pins while scrolling and reveals via a
 * clip-path/scale animation — the McAlpine "project hero" pattern.
 *
 * Drop this as the first section of a page inside <SmoothScrollProvider>.
 */
export default function PinnedHero({ image, title, eyebrow }) {
  const sectionRef = useScrollPin({
    buildDesktop: (tl, el) => {
      const img = el.querySelector('[data-hero-img]');
      const overlay = el.querySelector('[data-hero-overlay]');
      const heading = el.querySelector('[data-hero-heading]');

      tl.fromTo(
        img,
        { scale: 1.15, clipPath: 'inset(0% 0% 0% 0%)' },
        { scale: 1, clipPath: 'inset(8% 8% 8% 8%)', ease: 'none' },
        0
      )
        .to(overlay, { opacity: 0, ease: 'none' }, 0)
        .fromTo(
          heading,
          { y: 0 },
          { y: -40, ease: 'none' },
          0
        );
    },
    buildMobile: (tl, el) => {
      // Lighter pass: fade the overlay only, skip the scale/clip work.
      const overlay = el.querySelector('[data-hero-overlay]');
      tl.to(overlay, { opacity: 0.15, ease: 'none' });
    },
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label={title}
    >
      <img
        data-hero-img
        src={image}
        alt={title}
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div
        data-hero-overlay
        className="absolute inset-0 flex items-end bg-[--black]/60 p-10"
      >
        <div data-hero-heading>
          {eyebrow ? (
            <p className="mb-2 text-sm uppercase tracking-widest text-[--text]/70">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-5xl font-semibold text-[--text]">{title}</h1>
        </div>
      </div>
    </section>
  );
}

PinnedHero.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
};

PinnedHero.defaultProps = {
  eyebrow: undefined,
};
