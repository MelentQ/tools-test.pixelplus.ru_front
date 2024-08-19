import './bootstrap';
import animation from '@/ui/animation/animation';
import accordion from '@/ui/accordion/accordion';
import smoothScrolling from '@/ui/page/smoothScrolling';
import tip from '@/ui/tip/tip';
import searchForm from '@/ui/header/searchForm';
import burgerMenu from '@/ui/header/burgerMenu';
import $validation from '@/ui/form/validation';
import select from '@/ui/select/select';
import modal from '@/ui/modal/modal';
import phoneInput from '@/ui/input/phoneInput';
import scrollToAnchor from '@/layout/scripts/scrollToAnchor';
import handleForms from '@/ui/form/handleForms';
import codeSnippet from '@/ui/code-snippet/codeSnippet';
import tabs from '@/ui/tabs/tabs';

document.addEventListener('DOMContentLoaded', () => {
  window.pts.accordion = accordion;
  window.pts.utils.form = {
    handleForms,
  };

  smoothScrolling();
  animation();
  accordion();
  tip();
  searchForm();
  burgerMenu();
  select();
  $validation();
  modal();
  phoneInput();
  scrollToAnchor();
  codeSnippet();
  tabs();
});
