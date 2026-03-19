<template>
  <div class="card">
    <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="poke-img">
    <h3>{{ pokemon.name.fr }}</h3>
    <!-- Étoile favori - stopPropagation pour ne pas ouvrir la modale au clic -->
    <span class="star" @click.stop="toggleFavourite">
      {{ isFav ? '⭐' : '☆' }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavouritesStore } from '../stores/favourites'

const props = defineProps({
  pokemon: Object
})

const store = useFavouritesStore()

// Vérifie si ce pokémon est favori (Number() pour éviter les problèmes de type)
const isFav = computed(() => store.isFavourite(Number(props.pokemon.pokedex_id)))

// Ajoute ou retire des favoris
const toggleFavourite = () => {
  if (isFav.value) {
    store.removeFavourite(Number(props.pokemon.pokedex_id))
  } else {
    store.addFavourite(props.pokemon)
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.poke-img {
  width: 250px;
  height: auto;
}

.star {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.star:hover {
  transform: scale(1.3);
}
</style>