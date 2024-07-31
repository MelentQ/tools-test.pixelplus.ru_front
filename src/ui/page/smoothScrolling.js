import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const isTouch = () => !window.matchMedia('(hover: hover)').matches;

export default function smoothScrolling() {
  const flag = document.querySelector('.js-smooth-scrolling');
  if (!flag) return;

  if (!isTouch()) {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    });

    gsap.ticker.lagSmoothing(0);
  }
}
