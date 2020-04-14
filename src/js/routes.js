
import HomePage from '../pages/home.vue';
import globalPage from '../pages/global.vue';
import countryPage from '../pages/countries.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/global/',
    component: globalPage,
  },
  {
    path: '/country/',
    component: countryPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
