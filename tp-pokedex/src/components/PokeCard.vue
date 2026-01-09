<template>
  <div class="card">
    <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="poke-img">
    <h3>{{ pokemon.name.fr }}</h3>
    <span class="id-tag">#{{ pokemon.pokedex_id }}</span>
  </div>
</template>

<script setup>
defineProps({
  pokemon: Object
})
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
  width: 160px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}
.poke-img {
  width: 120px;
  height: 120px;
}
.id-tag {
  font-size: 0.8rem;
  color: #666;
}
</style>