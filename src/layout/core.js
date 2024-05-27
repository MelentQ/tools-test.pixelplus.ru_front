import './bootstrap';
import animation from '@/components/animation/animation';
import accordion from '@/components/accordion/accordion';
import smoothScrolling from '@/components/page/smoothScrolling';
import tip from '@/components/tip/tip';

document.addEventListener('DOMContentLoaded', () => {
  smoothScrolling();
  animation();
  accordion();
  tip();
});
