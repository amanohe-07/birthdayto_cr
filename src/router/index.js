import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishesView from '../views/WishesView.vue'
import PhotosView from '../views/PhotosView.vue'
import LetterView from '../views/LetterView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/wishes', component: WishesView },
  { path: '/photos', component: PhotosView },
  { path: '/letter', component: LetterView },
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes,
})

export default router
