# Recipe Realm

Recipe Realm is a web application that allows users to discover and collect food recipes. Users can view recipe details, create custom lists of recipes, add recipes to these lists, and remove them as needed.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Server](#server)
  - [Client](#client)
- [Running the Application](#running-the-application)
  - [Server](#server-1)
  - [Client](#client-1)
- [Testing](#testing)
- [Logic Explanations](#logic-explanations)

## Features

- View all recipes
- View recipe details
- Create custom recipe lists
- Add recipes to custom lists
- Remove recipes from custom lists
- Search and pagination for recipes

## Technologies

- **Frontend**: Vue.js
- **Backend**: Node.js, Express.js
- **Database**: JSON file storage

## Setup

### Server

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/recipe-realm.git
    ```

2. **Navigate to the server directory**:
    ```sh
    cd server
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

### Client

1. **Navigate to the client directory**:
    ```sh
    cd recipe-realm-frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Running the Application

### Server

1. **Navigate to the server directory** (if not already there):
    ```sh
    cd server
    ```

2. **Start the server**:
    ```sh
    node start
    ```

3. The server should now be running at `http://localhost:3000`.

### Client

1. **Navigate to the client directory** (if not already there):
    ```sh
    cd recipe-realm-frontend
    ```

2. **Start the client**:
    ```sh
    npm run serve
    ```

3. The client should now be running at `http://localhost:8080`.


## Testing

1. **Navigate to the server directory** (if not already there):
    ```sh
    cd server
    ```

2. **Install testing dependencies:**:
    ```sh
    npm install --save-dev jest supertest
    ```

3. **Run Tests:**:
    ```sh
    npm test
    ```
  This command runs tests for the server, including CRUD operations and error handling for the recipeController and listController.

## Logic Explanations

### Server

- **File Reading and Writing**:
  - The server reads recipes from a JSON file (`data/recipes.json`). This is done asynchronously using the `fs.promises` API.
  - When a request is made to add a recipe to a list, the server checks if the recipe exists in the `recipes.json` file before adding it to the list.

- **Endpoints**:
  - `GET /api/recipes`: Fetches all recipes.
  - `POST /api/lists`: Creates a new list.
  - `POST /api/lists/:listId/recipes`: Adds a recipe to a list if it doesn't already exist.
  - `DELETE /api/lists/:listId/recipes`: Removes a recipe from a list.
  - `DELETE /api/lists/:listId`: Removes a list.

### Client

- **Components**:
  - **RecipesPage**: Displays all recipes with pagination and search functionality.
  - **RecipeDetails**: Displays detailed information about a selected recipe and allows adding it to a list.
  - **MyListsPage**: Displays all custom lists, with options to remove a list or remove a recipe from a list.
  - **AddToList**: Allows adding a recipe to a new or existing list.
  - **Pagination**: Adds pagination to a big list of recipes.

- **State Management**:
  - Recipes and lists are managed within component state and fetched from the server as needed.
  - Methods are provided to add, remove, and search recipes, which update the state and re-render the UI accordingly.

- **Search and Pagination**:
  - **Search**: Filters recipes by name using the `searchQuery`.
  - **Pagination**: Divides the recipes into pages and allows navigation between them using the `Pagination` component.

- **User Interactions**:
  - Users can click on a recipe card to view details.
  - Users can create new lists and add recipes to these lists.
  - Users can remove recipes from lists and delete entire lists.
  - If an error occurs (e.g., duplicate entry or missing fields), appropriate error messages are displayed.

## Additional Notes

- Ensure that you have Node.js and npm installed on your machine.
- The server and client should be run concurrently, with the server handling API requests and the client rendering the UI.

