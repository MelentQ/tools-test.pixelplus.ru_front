import tippy from 'tippy.js';

export default function tip() {
  tippy('[data-tip]:not([data-tip=""])', {
    trigger: 'mouseenter',
    theme: 'pts',
    touch: ['hold', 500],
    allowHTML: true,
    placement: 'bottom',
    animation: 'fade',
    interactive: true,
    appendTo: document.body,
    content: (reference) => reference.getAttribute('data-tip'),
  });
}
