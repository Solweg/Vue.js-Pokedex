import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', () => {
  // Liste des pokémon favoris
  const favouritePokemons = ref([])

  // Ajouter un favori
  const addFavourite = (pokemon) => {
    favouritePokemons.value.push(pokemon)
  }

  // Supprimer un favori
  const removeFavourite = (id) => {
    favouritePokemons.value = favouritePokemons.value.filter(p => p.pokedex_id !== id)
  }

  // Supprimer tous les favoris
  const clearFavourites = () => {
    favouritePokemons.value = []
  }

  // Vérifier si un pokémon est favori
  const isFavourite = (id) => {
    return favouritePokemons.value.some(p => p.pokedex_id === id)
  }

  return { favouritePokemons, addFavourite, removeFavourite, clearFavourites, isFavourite }
})