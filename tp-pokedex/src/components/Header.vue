<template>
  <header class="header">
    <h1>Pokémon est trentenaire !</h1>
  </header>
</template>

<style scoped>
.header {
  background-color: blueviolet;
  color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 45px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  margin: 2% 3% 0 3%;  /* haut | droite | bas | gauche */
  width: calc(100% - 6%); /* compense les marges côtés */
  padding-bottom: 1.5rem;
}

h1 {
  margin: 0;
}
</style>