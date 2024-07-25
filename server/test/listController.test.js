const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const listController = require('../src/controllers/listController')
const recipeController = require('../src/controllers/recipeController')

const app = express()
app.use(bodyParser.json())

// Mock routes
app.get('/api/lists', listController.getAllLists)
app.post('/api/lists', listController.createList)
app.post('/api/lists/:listId/recipes', listController.addRecipeToList)
app.delete('/api/lists/:listId', listController.removeList)
app.delete('/api/lists/:listId/recipes', listController.removeRecipeFromList)

// Jest test cases
describe('List Controller', () => {
  let server

  beforeAll(() => {
    server = app.listen(3001)
  })

  afterAll(() => {
    server.close()
  })

  test('should get all lists', async () => {
    const res = await request(server).get('/api/lists')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('should create a new list', async () => {
    const res = await request(server)
      .post('/api/lists')
      .send({ title: 'New List' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('title', 'New List')
    expect(res.body).toHaveProperty('recipes', [])
  })

  test('should not create a list with an existing title', async () => {
    const res = await request(server)
      .post('/api/lists')
      .send({ title: 'Favorites' })

    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('error', 'List title already exists')
  })

  test('should add a recipe to a list', async () => {
    // Mock the recipe read function
    jest
      .spyOn(recipeController, 'readRecipesFile')
      .mockResolvedValue([
        { url: 'https://example.com/recipe1', Name: 'Recipe 1' },
      ])

    const res = await request(server)
      .post('/api/lists/1/recipes')
      .send({ url: 'https://example.com/recipe1' })

    expect(res.statusCode).toBe(200)
    expect(res.body.recipes).toContainEqual({
      url: 'https://example.com/recipe1',
      Name: 'Recipe 1',
    })
  })

  test('should not add a duplicate recipe to a list', async () => {
    const res = await request(server)
      .post('/api/lists/1/recipes')
      .send({ url: 'https://example.com/recipe1' })

    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty(
      'error',
      'Recipe already exists in the list',
    )
  })

  test('should remove a list', async () => {
    const res = await request(server).delete('/api/lists/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'List removed successfully')
  })

  test('should remove a recipe from a list', async () => {
    // Re-add the list and recipe for this test
    await request(server).post('/api/lists').send({ title: 'Favorites' })
    await request(server)
      .post('/api/lists/2/recipes')
      .send({ url: 'https://example.com/recipe1' })

    const res = await request(server)
      .delete('/api/lists/2/recipes')
      .send({ url: 'https://example.com/recipe1' })

    expect(res.statusCode).toBe(200)
    expect(res.body.recipes).not.toContainEqual({
      url: 'https://example.com/recipe1',
      Name: 'Recipe 1',
    })
  })
})
