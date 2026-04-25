import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishesView from '../views/WishesView.vue'
import PhotosView from '../views/PhotosView.vue'
import LetterView from '../views/LetterView.vue'
import EasterEggView from '../views/EasterEggView.vue'

const routes = [
  { path: '/', component: HomeView, meta: { title: 'Home' } },
  { path: '/wishes', component: WishesView, meta: { title: 'Wishes' } },
  { path: '/photos', component: PhotosView, meta: { title: 'Photos' } },
  { path: '/letter', component: LetterView, meta: { title: 'Letter' } },
  { path: '/easter-egg', component: EasterEggView, meta: { title: 'Easter Egg' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

export default router
