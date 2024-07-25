<template>
  <div class="add-to-list">
    <h3 class="header">Add to List</h3>
    <input
      v-model="newListTitle"
      required
      class="input-field"
      placeholder="New List Title"
    />
    {{ this.message }} <br />
    <button class="btn btn-primary" @click="createList">Create and Add</button>
    <h4 class="subheader">Existing Lists</h4>
    <ul class="list">
      <li v-for="list in lists" :key="list.id" class="list-item">
        {{ list.title }}
        <button class="btn btn-secondary" @click="addToList(list.id)">
          Add
        </button>
      </li>
    </ul>
    <button class="btn btn-close" @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: 'AddToList',
  props: ['recipeURL'],
  data() {
    return {
      lists: [],
      newListTitle: '',
      message: '',
    };
  },
  created() {
    fetch('http://localhost:3000/api/lists')
      .then((response) => response.json())
      .then((data) => {
        this.lists = data;
      });
  },
  methods: {
    createList() {
      if (this.newListTitle) {
        fetch('http://localhost:3000/api/lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: this.newListTitle }),
        })
          .then((response) => {
            if (response.status === 401) {
              return response.json().then((data) => {
                this.message = data.error;
              });
            } else if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then((data) => {
            this.addToList(data.id);
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      } else {
        this.message = "Name of a list can't be empty";
      }
    },
    addToList(listId) {
      fetch(`http://localhost:3000/api/lists/${listId}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: this.recipeURL }),
      })
        .then((response) => {
          if (response.status === 401) {
            return response.json().then((data) => {
              alert(data.error);
            });
          } else if (response.ok) {
            this.$emit('close');
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
/* Styling for the add-to-list container */

</style>
