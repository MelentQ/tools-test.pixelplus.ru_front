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
import Prism from 'prismjs';
import Cookies from 'js-cookie';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

Swiper.use([Autoplay, Navigation, Pagination]);

Prism.manual = true;

const Cookie = Cookies.withAttributes({ path: '/', expires: 30 });

window.pts = {
  dev: document.body.classList.contains('js-env-development'),
  axios,
  gsap,
  Swiper,
  Cookie,
  utils: {
    slider: {
      paginationOptions,
      navigationOptions,
      hideLoader,
      showLoader,
    },
  },
};
