const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const recipeController = require('../src/controllers/recipeController')

const app = express()
app.use(bodyParser.json())

// Mock route
app.get('/api/recipes', recipeController.getAllRecipes)

// Mock data
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}))

const fs = require('fs').promises

describe('Recipe Controller', () => {
  let server

  beforeAll(() => {
    server = app.listen(3002)
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get all recipes', async () => {
    const mockRecipes = [
      { url: 'https://example.com/recipe1', Name: 'Recipe 1' },
      { url: 'https://example.com/recipe2', Name: 'Recipe 2' },
    ]

    fs.readFile.mockResolvedValueOnce(JSON.stringify(mockRecipes)) // Use mockResolvedValueOnce to ensure it's used only once

    const res = await request(server).get('/api/recipes')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockRecipes)
  })
})
