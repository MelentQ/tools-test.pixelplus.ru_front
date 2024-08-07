import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import paginationOptions from '@/ui/slider/paginationOptions';
import navigationOptions from '@/ui/slider/navigationOptions';
import hideLoader from '@/ui/slider/hideLoader';
import showLoader from '@/ui/slider/showLoader';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

Swiper.use([Autoplay, Navigation, Pagination]);

window.pts = {
  dev: document.body.classList.contains('js-env-development'),
  axios,
  gsap,
  Swiper,
  utils: {
    slider: {
      paginationOptions,
      navigationOptions,
      hideLoader,
      showLoader,
    },
  },
};
