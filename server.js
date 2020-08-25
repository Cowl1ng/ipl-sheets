const express = require('express')
const app = express()

// // Init middleware
// app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Define routes
app.use('/api/players', require('./routes/players'))
app.use('/api/auth', require('./routes/auth'))

// Define port used and connect server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
