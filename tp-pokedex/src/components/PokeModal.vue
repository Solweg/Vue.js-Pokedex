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
    </div>
  </div>
</template>

<script setup>

//Réception du Pokémon depuis App.vue
defineProps({
  pokemon: Object
})

//fermeture modale
defineEmits(['close'])
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
</style>