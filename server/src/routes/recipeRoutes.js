const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')

// Get all recipes
router.get('/', recipeController.getAllRecipes)

module.exports = router
