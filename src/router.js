import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/mangaslivre/chapters',
      name: 'manga_chapters',
      component: () => import('./views/mangaslivre/MangaChapters.vue')
    },
    {
      path: '/mangaslivre/chapter/read',
      name:'chapter_reader',
      component: () => import('./views/mangaslivre/ChapterReader.vue')
    },
    {
      path:'/youtube/download',
      name:'youtubedownloader',
      component: () => import('./views/youtube/DownloaderYT.vue')
    },
    {
      path:'/mangaslivre/search',
      name:'mangaslivresearch',
      component: () => import('./views/mangaslivre/SearchMangas.vue')
    }
  ]
})
