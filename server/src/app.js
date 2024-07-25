const express = require('express')
const cors = require('cors')
const recipeRoutes = require('./routes/recipeRoutes')
const listRoutes = require('./routes/listRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/recipes', recipeRoutes)
app.use('/api/lists', listRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
