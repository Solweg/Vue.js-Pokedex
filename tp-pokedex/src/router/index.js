import { createRouter, createWebHistory } from 'vue-router'
import PokeList from '../views/PokeList.vue'
import PokeDetail from '../views/PokeDetail.vue'

const routes = [
  { path: '/', component: PokeList },
  { path: '/detail', component: PokeDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router