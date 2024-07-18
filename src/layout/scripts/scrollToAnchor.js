import scrollTo from '@/layout/scripts/scrollTo';

export default function scrollToAnchor() {
  const selector = 'a[href]:not([href=""])';

  document.addEventListener('click', (e) => {
    if (e.target.matches(selector) || e.target.closest(selector)) {
      const link = e.target.matches(selector) ? e.target : e.target.closest(selector);
      const anchor = document.querySelector(link.getAttribute('href'));
      if (anchor) {
        e.preventDefault();

        scrollTo({
          duration: 0.3,
          ease: 'ease',
          scrollTo: {
            y: anchor,
            offsetY: 80,
          },
        });
      }
    }
  });
}
