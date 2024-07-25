import { createRouter, createWebHistory } from 'vue-router';
import RecipesPage from '../components/RecipesPage.vue';
import MyListsPage from '../components/MyListsPage.vue';

const routes = [
  { path: '/', component: RecipesPage },
  { path: '/lists', component: MyListsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
