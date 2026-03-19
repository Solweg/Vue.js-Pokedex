<template>
  <header class="header">
    <h1>Pokémon est trentenaire !</h1>
    <nav>
      <RouterLink to="/">Liste</RouterLink>
      <RouterLink to="/detail">Détail</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: blueviolet;
  color: white;
  padding: 1rem 2rem;
  border-radius: 45px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
  margin: 2% 3% 0 3%;
  width: calc(100% - 6%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  margin: 0;
  padding-left: 3rem;
}

nav {
  display: flex;
  gap: 30px;
  padding-right: 3rem;
}

nav a {
  color:white;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
}


nav a.router-link-active {
  border-bottom: 2px solid white;
}
</style>