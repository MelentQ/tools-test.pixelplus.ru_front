import Swiper from 'swiper';
import {
  Autoplay, Grid, Navigation, Pagination,
} from 'swiper/modules';
import paginationOptions from './paginationOptions';
import navigationOptions from './navigationOptions';

Swiper.use([Autoplay, Grid, Navigation, Pagination]);
window.pts.slider = {
  Swiper,
  hideLoader(swiper) {
    swiper.el.classList.remove('loader');
  },
  showLoader(swiper) {
    swiper.el.classList.add('loader');
  },
  paginationOptions,
  navigationOptions,
};
