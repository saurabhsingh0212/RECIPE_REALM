<template>
  <div class="recipe-details">
    <p class="recipe-ingredients">
      Ingredients: {{ recipe.Ingredients.join(', ') }}
    </p>
    <p class="recipe-method">
      Method: <br />
      <span v-for="(step, index) in recipe.Method" :key="index"
        >{{ index + 1 }}. {{ step }}<br
      /></span>
    </p>
    <div class="button-group">
      <button v-if="this.showadd" class="btn" @click="showAddToList = true">
        Add to List
      </button>
      <button class="btn btn-close" @click="$emit('close')">Close</button>
    </div>
    <AddToList
      v-if="showAddToList"
      :recipeURL="recipe.url"
      @close="showAddToList = false"
    />
  </div>
</template>

<script>
import AddToList from './AddToList.vue';

export default {
  name: 'RecipeDetails',
  components: { AddToList },
  props: ['recipe', 'showadd'],
  data() {
    return {
      showAddToList: false,
    };
  },
};
</script>

<style scoped>
</style>
