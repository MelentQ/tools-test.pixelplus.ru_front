document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-numbers:not(.--initialized)');
  containers.forEach((container) => {
    const numbers = container.querySelectorAll('.js-numbers-card-animation');

    window.pts.gsap.from(numbers, {
      scrollTrigger: container,
      textContent: 0,
      duration: 2,
      ease: 'ease.out',
      snap: { textContent: 1 },
      stagger: {
        each: 1.0,
        onUpdate() {
          const target = this.targets()[0];
          target.textContent = Number(target.textContent).toLocaleString();
        },
      },
    });

    container.classList.add('--initialized');
  });
});
