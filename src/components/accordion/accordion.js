import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function accordion(config) {
  const defaultConfig = {
    scope: document,
    containerClass: 'js-accordion',
    buttonClass: 'js-accordion-button',
    panelClass: 'js-accordion-panel',
    speed: 0.3,
    onAfterOpen: undefined,
    onAfterClose: undefined,
    parentNode(container) {
      return container.parentNode;
    },
  };

  const options = Object.assign(defaultConfig, config);

  const open = (element) => {
    gsap.to(element, {
      height: 'auto',
      duration: options.speed,
      onComplete() {
        ScrollTrigger.refresh();

        if (options.onAfterOpen && typeof options.onAfterOpen === 'function') {
          options.onAfterOpen(element);
        }
      },
    });
  };

  const close = (element) => {
    gsap.to(element, {
      height: 0,
      duration: options.speed,
      onComplete() {
        ScrollTrigger.refresh();

        if (options.onAfterClose && typeof options.onAfterClose === 'function') {
          options.onAfterClose(element);
        }
      },
    });
  };

  options.scope.addEventListener('click', (e) => {
    if (e.target.closest(`.${options.buttonClass}`) || e.target.classList.contains(options.buttonClass)) {
      e.preventDefault();

      const button = e.target.classList.contains(options.buttonClass) ? e.target : e.target.closest(`.${options.buttonClass}`);
      const element = button.closest(`.${options.containerClass}`);
      const panel = element.querySelector(`.${options.panelClass}`);
      const parent = typeof options.parentNode === 'function' ? options.parentNode(element) : options.parentNode;
      const siblings = parent ? [...parent.querySelectorAll(`.${options.containerClass}`)] : [];

      if (element.hasAttribute('data-close-other')) {
        siblings.forEach((otherElement) => {
          if (otherElement !== element) {
            if (otherElement.classList.contains('--active')) {
              close(otherElement.querySelector(`.${options.panelClass}`));
              otherElement.classList.remove('--active');
            }
          }
        });
      }

      if (element.classList.contains('--active')) {
        close(panel);
      } else {
        open(panel);
      }

      element.classList.toggle('--active');
    }
  });
}

window.pts.accordion = accordion;
