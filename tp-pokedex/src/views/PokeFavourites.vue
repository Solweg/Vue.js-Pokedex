<template>
  <main>
    <div class="fav-header">
      <h2>Mes Pokémon favoris</h2>
      <button class="clear-btn" @click="store.clearFavourites">Tout supprimer</button>
    </div>

    <div v-if="store.favouritePokemons.length === 0" class="empty">
      Aucun favori pour le moment ⭐
    </div>

    <div v-else class="container">
      <PokeCard
        v-for="p in store.favouritePokemons"
        :key="p.pokedex_id"
        :pokemon="p"
        @click="openModal(p)"
      />
    </div>

    <PokeModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useFavouritesStore } from '../stores/favourites'
import PokeCard from '../components/PokeCard.vue'
import PokeModal from '../components/PokeModal.vue'

const store = useFavouritesStore()
const selectedPokemon = ref(null)

const openModal = (pokemon) => {
  selectedPokemon.value = pokemon
}
</script>

<style scoped>
.fav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
}

.fav-header h2 {
  color: blueviolet;
  margin: 0;
}

.clear-btn {
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #892be2, #892be281);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.clear-btn:hover {
  background: linear-gradient(135deg, #892be281, #892be2);
}

.empty {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #888;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}
</style>