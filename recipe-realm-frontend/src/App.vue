<template>
  <div id="app">
    <nav>
      <router-link class="nav-link" to="/">Recipes</router-link>
      <router-link class="nav-link" to="/lists">My Lists</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Basic styling for the app */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

/* Style for navigation links */
nav {
  margin-bottom: 20px;
}

.nav-link {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.nav-link:hover {
  background-color: #0056b3;
  color: #e0e0e0;
}

.nav-link:active {
  background-color: #003d7a;
}
</style>
