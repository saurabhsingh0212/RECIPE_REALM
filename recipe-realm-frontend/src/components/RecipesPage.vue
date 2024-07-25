<template>
  <div class="recipes-page">
    <h1>All Recipes</h1>
    <div class="search-bar">
      <input v-model="searchQuery" @input="searchRecipes" placeholder="Search recipe names..." />
    </div>
    <div class="recipe-list">
      <div v-for="recipe in paginatedRecipes" :key="recipe.url" class="recipe-item">
        <h2 class="recipe-title">{{ recipe.Name }}</h2>
        <p class="recipe-description">{{ recipe.Description }}</p>
        <p class="recipe-author">Author: {{ recipe.Author }}</p>
        <button
          v-if="this.selectedRecipe == null || this.selectedRecipe != recipe"
          class="btn-view-details"
          @click="selectRecipe(recipe)"
        >
          View Details
        </button>
        <div v-if="recipe == this.selectedRecipe">
          <RecipeDetails
            :recipe="selectedRecipe"
            :showadd="true"
            @close="closedetails()"
          />
        </div>
      </div>
      <pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="fetchPage" />
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import RecipeDetails from './RecipeDetails.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'RecipesPage',
  components: { RecipeDetails, Pagination },
  data() {
    return {
      recipes: [],
      selectedRecipe: null,
      searchQuery: '',
      filteredRecipes: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredRecipes.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredRecipes.length / this.pageSize);
    }
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      fetch('http://localhost:3000/api/recipes')
        .then(response => response.json())
        .then(data => {
          this.recipes = data;
          this.filteredRecipes = data;
        });
    },
    searchRecipes() {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.currentPage = 1; // Reset to first page after search
    },
    fetchPage(page) {
      this.currentPage = page;
    },
    selectRecipe(recipe) {
      this.selectedRecipe = recipe;
    },
    closedetails() {
      this.selectedRecipe = null;
    }
  }
};
</script>

<style scoped>
/* Styling for the View Details button */

</style>
