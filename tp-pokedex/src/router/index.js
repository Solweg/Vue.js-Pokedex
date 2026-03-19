import { createRouter, createWebHistory } from 'vue-router'
import PokeList from '../views/PokeList.vue'
import PokeDetail from '../views/PokeDetail.vue'
import PokeFavourites from '../views/PokeFavourites.vue'

const routes = [
  { path: '/', component: PokeList },
  { path: '/detail/:id', component: PokeDetail },
  { path: '/favourites', component: PokeFavourites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router