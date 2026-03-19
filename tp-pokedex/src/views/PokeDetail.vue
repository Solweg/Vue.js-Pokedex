<template>
  <div v-if="pokemon" class="detail">

    <!-- Boutons de navigation -->
    <div class="navigation">
      <button @click="prevPokemon" :disabled="parseInt(id) <= 1">← Précédent</button>
      <span>#{{ id }}</span>
      <button @click="nextPokemon">Suivant →</button>
    </div>

    <!-- En-tête -->
    <div class="detail-header">
      <div class="sprites">
        <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" />
        <img :src="pokemon.sprites.shiny" :alt="pokemon.name.fr + ' shiny'" />
        <p>Shiny</p>
      </div>
      <div class="detail-title">
        <h1>
          {{ pokemon.name.fr }}
          <!-- Étoile favori -->
          <span class="star" @click="toggleFavourite">
            {{ isFav ? '⭐' : '☆' }}
          </span>
        </h1>
        <p class="subtitle">{{ pokemon.name.en }} / {{ pokemon.name.jp }}</p>
        <p><strong>Catégorie :</strong> {{ pokemon.category }}</p>
        <p><strong>Génération :</strong> {{ pokemon.generation }}</p>
        <p><strong>Taille :</strong> {{ pokemon.height }}</p>
        <p><strong>Poids :</strong> {{ pokemon.weight }}</p>
        <p><strong>Taux de capture :</strong> {{ pokemon.catch_rate }}</p>
        <p><strong>Sexe :</strong> ♂ {{ pokemon.sexe.male }}% / ♀ {{ pokemon.sexe.female }}%</p>
        <p><strong>Groupes œuf :</strong> {{ pokemon.egg_groups.join(', ') }}</p>
      </div>
    </div>

    <!-- Types -->
    <div class="section">
      <h2>Types</h2>
      <div class="types">
        <div v-for="t in pokemon.types" :key="t.name" class="type-badge">
          <img :src="t.image" :alt="t.name" />
          <span>{{ t.name }}</span>
        </div>
      </div>
    </div>

    <!-- Talents -->
    <div class="section">
      <h2>Talents</h2>
      <ul>
        <li v-for="t in pokemon.talents" :key="t.name">
          {{ t.name }} <em v-if="t.tc">(talent caché)</em>
        </li>
      </ul>
    </div>

    <!-- Stats -->
    <div class="section">
      <h2>Statistiques</h2>
      <div class="stats">
        <div class="stat"><span>HP</span><strong>{{ pokemon.stats.hp }}</strong></div>
        <div class="stat"><span>Attaque</span><strong>{{ pokemon.stats.atk }}</strong></div>
        <div class="stat"><span>Défense</span><strong>{{ pokemon.stats.def }}</strong></div>
        <div class="stat"><span>Atk Spé</span><strong>{{ pokemon.stats.spe_atk }}</strong></div>
        <div class="stat"><span>Déf Spé</span><strong>{{ pokemon.stats.spe_def }}</strong></div>
        <div class="stat"><span>Vitesse</span><strong>{{ pokemon.stats.vit }}</strong></div>
      </div>
    </div>

    <!-- Évolutions -->
    <div class="section" v-if="pokemon.evolution.next">
      <h2>Évolutions</h2>
      <div class="evolutions">
        <div v-for="e in pokemon.evolution.next" :key="e.pokedex_id" class="evo">
          <RouterLink :to="`/detail/${e.pokedex_id}`">{{ e.name }}</RouterLink>
          <span>{{ e.condition }}</span>
        </div>
      </div>
    </div>

    <!-- Résistances -->
    <div class="section">
      <h2>Résistances</h2>
      <div class="resistances">
        <div v-for="r in pokemon.resistances" :key="r.name" class="resist"
          :class="{ immune: r.multiplier === 0, weak: r.multiplier > 1, resistant: r.multiplier < 1 && r.multiplier > 0 }">
          <span>{{ r.name }}</span>
          <strong>x{{ r.multiplier }}</strong>
        </div>
      </div>
    </div>

  </div>
  <div v-else class="loader">Chargement...</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavouritesStore } from '../stores/favourites'

const route = useRoute()
const router = useRouter()
const store = useFavouritesStore()
const pokemon = ref(null)

// id réactif basé sur l'URL
const id = ref(route.params.id)

// Vérifie si ce pokémon est favori
const isFav = computed(() => store.isFavourite(parseInt(id.value)))

// Ajoute ou retire des favoris
const toggleFavourite = () => {
  if (isFav.value) {
    store.removeFavourite(parseInt(id.value))
  } else {
    store.addFavourite(pokemon.value)
  }
}

// Fonction de chargement
const loadPokemon = async (pokemonId) => {
  pokemon.value = null
  try {
    const response = await fetch(`https://tyradex.app/api/v1/pokemon/${pokemonId}`)
    pokemon.value = await response.json()
  } catch (error) {
    console.error("Erreur :", error)
  }
}

// Watcher : se déclenche à chaque changement d'id dans l'URL
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
    loadPokemon(newId)
  }
)

// Chargement initial
loadPokemon(id.value)

// Navigation
const prevPokemon = () => {
  router.push(`/detail/${parseInt(id.value) - 1}`)
}

const nextPokemon = () => {
  router.push(`/detail/${parseInt(id.value) + 1}`)
}
</script>

<style scoped>
.detail {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: sans-serif;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.navigation button {
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #892be2, #892be281);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.navigation button:hover {
  background: linear-gradient(135deg, #892be281, #892be2);
}

.navigation button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.navigation span {
  font-size: 1.1rem;
  font-weight: bold;
  color: blueviolet;
}

.detail-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-bottom: 40px;
}

.sprites {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
}

.sprites img {
  width: 150px;
}

.sprites p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.detail-title h1 {
  margin: 0 0 5px 0;
  color: blueviolet;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.star {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.star:hover {
  transform: scale(1.3);
}

.subtitle {
  color: #888;
  margin: 0 0 15px 0;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: blueviolet;
  border-bottom: 2px solid #892be281;
  padding-bottom: 5px;
  text-align: center;
}

.types {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-badge img {
  width: 30px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.stat {
  background: #f0e6ff;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.stat span {
  font-size: 0.8rem;
  color: #666;
}

.stat strong {
  font-size: 1.3rem;
  color: blueviolet;
}

.evolutions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.evo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.evo a {
  color: blueviolet;
  font-weight: bold;
}

.resistances {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.resist {
  padding: 6px 12px;
  border-radius: 10px;
  background: #eee;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resist.immune { background: #ccc; }
.resist.weak { background: #ffcccc; }
.resist.resistant { background: #ccffcc; }

.loader {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: blueviolet;
}
</style>