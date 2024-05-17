// Load environment variables from .env file
require('dotenv').config()

// Create an Express application
const express = require('express')
const app = express()

// Parse JSON bodies
app.use(express.json())

// Allow cross-origin requests
const cors = require('cors')
app.use(cors())

// Parse cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Create an HTTP server
const http = require('http')
const port = process.env.PORT || 5000
const httpServer = http.createServer(app)

// Set up socket.io
const io = require('socket.io')(httpServer, {
  cors: {
    origin: true
  }
})

// Handle socket connections
io.on('connection', (socket) => {
  socketServer(socket, io)
})

// Set up API routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/apiRouter'))

// Connect to MongoDB
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if(err) throw err;
  console.log('Connected to mongodb')
})

// Serve static files in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// Start the server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
