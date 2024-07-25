const fs = require('fs').promises // Use the promises version of fs
const path = require('path')

const recipesPath = path.join(__dirname, '../data/recipes.json')

const readRecipesFile = async () => {
  try {
    const data = await fs.readFile(recipesPath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading recipes file:', err)
    throw err // Propagate the error
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await readRecipesFile()
    res.json(recipes)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getAllRecipes,
  readRecipesFile,
}
