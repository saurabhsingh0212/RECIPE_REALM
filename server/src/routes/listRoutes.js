const express = require('express')
const router = express.Router()
const listController = require('../controllers/listController')

// Route to get all lists
router.get('/', listController.getAllLists)

// Route to create a new list
router.post('/', listController.createList)

// Route to add a recipe to a list
router.post('/:listId/recipes', listController.addRecipeToList)

router.delete('/:listId/recipes', listController.removeRecipeFromList)

router.delete('/lists/:listId', listController.removeList)

module.exports = router
