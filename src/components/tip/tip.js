import tippy from 'tippy.js';

export default function tip() {
  tippy('[data-tip]:not([data-tip=""])', {
    theme: 'pts',
    allowHTML: true,
    placement: 'bottom',
    animation: 'fade',
    interactive: true,
    appendTo: document.body,
    content: (reference) => reference.getAttribute('data-tip'),
  });
}
