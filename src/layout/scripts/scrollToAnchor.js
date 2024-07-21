import isSelectorValid from '@/layout/scripts/isSelectorValid';
import { gsap } from 'gsap';

export default function scrollToAnchor() {
  const selector = 'a[href]:not([href=""])';

  document.addEventListener('click', (e) => {
    if (e.target.matches(selector) || e.target.closest(selector)) {
      const link = e.target.matches(selector) ? e.target : e.target.closest(selector);
      const anchorSelector = link.getAttribute('href');
      if (isSelectorValid(anchorSelector)) {
        const anchor = document.querySelector(anchorSelector);
        if (anchor) {
          e.preventDefault();

          gsap.to(window, {
            duration: 0.3,
            ease: 'ease',
            scrollTo: {
              y: anchor,
              offsetY: 80,
            },
          });
        }
      }
    }
  });
}
