<template>
  <Header />

  <main>

    <div class="container">
      <PokeCard v-for="p in pokemons" :key="p.pokedex_id" :pokemon="p" @click="openModal(p)" />
    </div>

    <PokeModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import PokeCard from './components/PokeCard.vue'
import PokeModal from './components/PokeModal.vue'

const pokemons = ref([])
const selectedPokemon = ref(null) // Contient le Pokémon à afficher dans la modale


const openModal = (pokemon) => {
  selectedPokemon.value = pokemon
  console.log("On veut voir :", pokemon.name.fr)
}

onMounted(async () => {
  try {
    const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon')
    const data = await response.json()
    data.shift()
    pokemons.value = data
  } catch (error) {
    console.error("Erreur :", error)
  }
})
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.loader {
  text-align: center;
  font-weight: bold;
}
</style>