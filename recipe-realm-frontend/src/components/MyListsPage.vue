<template>
  <div class="my-lists-page">
    <h1>My Lists</h1>
    <div v-for="list in lists" :key="list.id" class="list-item-my-list">
      <div class="list-header-my-list">
        <h2 class="list-title-my-list">{{ list.title }}</h2>
        <button class="btn btn-delete" @click="removeList(list.id)">
          Remove List
        </button>
      </div>
      <br>
      <ul class="recipe-list-my-list">
        <li
          v-for="recipe in list.recipes"
          :key="recipe.url"
          class="recipe-item-my-list"
        >
          <div class="recipe-details-my-list">
            <span class="recipe-name">{{ recipe.Name }}</span>
            <span class="recipe-author">Author: {{ recipe.Author }}</span>
            <div v-if="recipe == this.selectedRecipe">
              <RecipeDetails
                :recipe="selectedRecipe"
                :showadd="false"
                @close="closedetails()"
              />
            </div>
          </div>
          <div
            v-if="this.selectedRecipe == null || this.selectedRecipe != recipe"
            class="recipe-actions"
          >
            <button class="btn btn-view" @click="viewRecipeDetails(recipe)">
              View Details
            </button>
            <button
              class="btn btn-remove"
              @click="removeRecipeFromList(list.id, recipe.url)"
            >
              Remove
            </button>
          </div>
        </li>
        <p v-if="list.recipes.length==0">No recipes in this list</p>
      </ul>
    </div>
    <p v-if="lists.length==0">No lists available to show!!</p>
  </div>
</template>

<script>
import RecipeDetails from './RecipeDetails.vue';

export default {
  name: 'MyListsPage',
  components: { RecipeDetails },
  data() {
    return {
      lists: [],
      selectedRecipe: null,
    };
  },
  created() {
    this.fetchLists();
  },
  methods: {
    fetchLists() {
      fetch('http://localhost:3000/api/lists')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.lists = data;
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    },
    removeList(listId) {
      fetch(`http://localhost:3000/api/lists/lists/${listId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            this.lists = this.lists.filter((list) => list.id !== listId);
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    },
    viewRecipeDetails(recipe) {
      this.selectedRecipe = recipe;
    },
    closedetails() {
      this.selectedRecipe = null;
    },
    removeRecipeFromList(listId, recipeUrl) {
      fetch(`http://localhost:3000/api/lists/${listId}/recipes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: recipeUrl }),
      })
        .then((response) => {
          if (response.ok) {
            this.lists = this.lists.map((list) => {
              if (list.id === listId) {
                list.recipes = list.recipes.filter(
                  (recipe) => recipe.url !== recipeUrl
                );
              }
              return list;
            });
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
