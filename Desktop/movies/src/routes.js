import VueRouter from 'vue-router';

let routes = [
  {
    name: 'home',
    path: '/',
    components: {
      'list-router-view': require('./components/Home.vue')
    }
  },
  {
    name: 'home-category',
    path: '/movies/:category',
    components: {
      'list-router-view': require('./components/MoviesList.vue')
    }
  },
  {
    name: 'movie',
    path: '/movie/:id',
    components: {
      'page-router-view': require('./components/MoviePage.vue')
    },
    beforeEnter: (to, from, next) => {
      if(history.state && history.state.popup && from.name){
        eventHub.$emit('openMoviePopup', to.params.id, false);
        return;
      }
      next();
    }
  }
];

const router =  new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
});

router.beforeEach((to, from, next) => {
  // Toggle mobile nav
  if(document.querySelector('.nav__hamburger--active')){
    document.querySelector('.nav__hamburger').classList.remove('nav__hamburger--active');
    document.querySelector('.nav__list').classList.remove('nav__list--active');
  }
  next();
});

export default router;
