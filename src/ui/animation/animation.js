export default function animation() {
  const callback = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animation--active');
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0.01,
  });

  const elements = document.querySelectorAll('.animation');
  elements.forEach((element) => {
    observer.observe(element);
  });
}
