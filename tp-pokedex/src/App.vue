<template>
  <div>
  <h1>Mon Pokédex du Turfu en Vue.js</h1>
  <p v-if="pokemons.length === 0">Chargement des petits animaux mignons...</p>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.pokedex_id">
      {{ pokemon.name.fr }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {ref,onMounted} from 'vue'

  const pokemons = ref([]) // Variable réactive pour stocker les pokémons

  onMounted(async () => {
    try {
      // Appel l'API Tyradex
      const response = await fetch ('ttps://tyradex.vercel.app/api/v1/pokemon')
      const data = await response.json()

      // Met les données dans la variable pokemons
      pokemons.value = data
    }catch (error) {
      console.error("Erreur lors de l'appel API:", error)
    }
    }
  )
</script>