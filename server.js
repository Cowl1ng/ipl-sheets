const express = require('express')
const app = express()
const connectDB = require('./config/db')

// Connect to database
connectDB()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Define routes
app.use('/api/players', require('./routes/players'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))

// Define port used and connect server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
