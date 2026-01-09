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
// Import des fonctions de Vue.js
import { ref, onMounted } from 'vue'

// Import des composants
import Header from './components/Header.vue'
import PokeCard from './components/PokeCard.vue'
import PokeModal from './components/PokeModal.vue'

// Création de la liste réactive
const pokemons = ref([])

// Sans selection la modale est cachée
const selectedPokemon = ref(null)

// Fonction déclenchée au clic sur une PokeCard
const openModal = (pokemon) => {
  selectedPokemon.value = pokemon
  console.log("On veut voir :", pokemon.name.fr)
}


onMounted(async () => {
  try {
    // Appel à l'API Tyradex
    const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon')
    const data = await response.json()

    // Retire l'élément 0 
    data.shift()

    // Insertion des données dans la liste dynamique
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