import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import paginationOptions from '@/components/slider/paginationOptions';
import navigationOptions from '@/components/slider/navigationOptions';
import hideLoader from '@/components/slider/hideLoader';
import showLoader from '@/components/slider/showLoader';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

Swiper.use([Autoplay, Navigation, Pagination]);

window.pts = {
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
