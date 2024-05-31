import './bootstrap';
import '@/components/slider';
import animation from '@/components/animation/animation';
import accordion from '@/components/accordion/accordion';
import smoothScrolling from '@/components/page/smoothScrolling';
import tip from '@/components/tip/tip';
import searchForm from '@/components/header/searchForm';
import burgerMenu from '@/components/header/burgerMenu';
import $validation from '@/components/form/validation';
import select from '@/components/select/select';
import modal from '@/components/modal/modal';

document.addEventListener('DOMContentLoaded', () => {
  smoothScrolling();
  animation();
  accordion();
  tip();
  searchForm();
  burgerMenu();
  $validation();
  select();
  modal();
});
