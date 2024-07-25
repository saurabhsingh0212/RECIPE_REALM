let lists = [
  {
    id: 1,
    title: 'Favorites',
    recipes: [],
  },
]

const recipeController = require('./recipeController')

const getAllLists = (req, res) => {
  res.json(lists)
}

const createList = (req, res) => {
  const { title } = req.body

  // Check if the list title already exists
  const existingList = lists.find((list) => list.title === title)
  if (existingList) {
    return res.status(401).json({ error: 'List title already exists' })
  }

  // If title does not exist, create a new list
  const newList = {
    id: lists.length + 1,
    title: title,
    recipes: [],
  }
  lists.push(newList)
  res.json(newList)
}

const addRecipeToList = async (req, res) => {
  const { listId } = req.params
  const { url } = req.body

  const list = lists.find((l) => l.id === parseInt(listId))
  if (!list) return res.status(404).json({ error: 'List not found' })

  try {
    const recipes = await recipeController.readRecipesFile()
    const recipe = recipes.find((r) => r.url === url)
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' })

    const recipeExists = list.recipes.some((r) => r.url === url)
    if (recipeExists) {
      return res
        .status(401)
        .json({ error: 'Recipe already exists in the list' })
    }

    list.recipes.push(recipe)
    res.status(200).json(list)
  } catch (err) {
    console.error('Error reading recipes file:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

function removeList(req, res) {
  const { listId } = req.params
  // Find the index of the list to be removed
  const index = lists.findIndex((list) => list.id === parseInt(listId))

  if (index === -1) {
    return res.status(404).json({ error: 'List not found' })
  }

  // Remove the list from the array
  lists.splice(index, 1)

  // Send a success response
  res.status(200).json({ message: 'List removed successfully' })
}

const removeRecipeFromList = async (req, res) => {
  const { listId } = req.params
  const { url } = req.body
  try {
    const list = lists.find((l) => l.id === parseInt(listId))

    if (!list) return res.status(404).json({ error: 'List not found' })
    list.recipes = list.recipes.filter((recipe) => recipe.url !== url)
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getAllLists,
  createList,
  addRecipeToList,
  removeList,
  removeRecipeFromList,
}
