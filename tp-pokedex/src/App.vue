<template>
  <Header />
  <main>
    <!-- Champ de recherche lié à la variable search -->
    <div class="search-wrapper">
      <input id="search" v-model="search" placeholder="Cherche ton Pokémon..." />
    </div>

    <div class="container">
      <!-- On boucle sur filteredPokemons (computed) et non plus pokemons -->
      <PokeCard v-for="p in filteredPokemons" :key="p.pokedex_id" :pokemon="p" @click="openModal(p)" />
    </div>

    <!-- La modale s'affiche uniquement si un pokémon est sélectionné -->
    <PokeModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
  </main>
</template>

<script setup>
// Import des fonctions de Vue.js (ajout de computed)
import { ref, onMounted, computed } from 'vue'

// Import des composants
import Header from './components/Header.vue'
import PokeCard from './components/PokeCard.vue'
import PokeModal from './components/PokeModal.vue'

// Création de la liste réactive
const pokemons = ref([])

// Sans sélection la modale est cachée
const selectedPokemon = ref(null)

// Valeur du champ de recherche
const search = ref('')

// Liste filtrée : recalculée automatiquement quand search ou pokemons change
const filteredPokemons = computed(() => {
  return pokemons.value.filter(p =>
    p.name.fr.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Fonction déclenchée au clic sur une PokeCard
const openModal = (pokemon) => {
  selectedPokemon.value = pokemon
  console.log("On veut voir :", pokemon.name.fr)
}

onMounted(async () => {
  try {
    // Appel à l'API Tyradex
    const response = await fetch('https://tyradex.app/api/v1/pokemon')
    const data = await response.json()

    // Retire l'élément 0 (qui n'est pas un vrai Pokémon)
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
main {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: block;
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

/* Zone de recherche */
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 72px; /* hauteur du header */
  z-index: 99;
  background-color: #f5f5f5;
  padding: 10px 0;
  gap: 8px;
  top: 100px;
}

.search-wrapper input {
  width: 500px;
  padding: 20px 20px;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background-color: #892be281;
  border: 2px;
  margin-top: 20px;
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: bold;

}

.search-wrapper ::placeholder {
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

.search-wrapper :hover {
  background-color: #892be2;
  cursor: pointer;
}
</style>