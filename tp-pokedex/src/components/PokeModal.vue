<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">X</button>
      <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr">
      <h2>{{ pokemon.name.fr }}</h2>
      <div class="stats">
        <p><strong>Poids :</strong> {{ pokemon.weight }}</p>
        <p><strong>Taille :</strong> {{ pokemon.height }}</p>
      </div>
      <!-- Bouton pour naviguer vers la page détail -->
      <button class="detail-btn" @click="goToDetail">Voir plus</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Réception du Pokémon depuis PokeList.vue
const props = defineProps({
  pokemon: Object
})

// Fermeture modale
defineEmits(['close'])

// Navigation vers la page détail
const router = useRouter()
const goToDetail = () => {
  router.push(`/detail/${props.pokemon.pokedex_id}`)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgb(227, 233, 243);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  position: relative;
  min-width: 300px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: black;
}

.detail-btn {
  margin-top: 15px;
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #892be2, #892be281);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.detail-btn:hover {
  background: linear-gradient(135deg, #892be281, #892be2);
}
</style>