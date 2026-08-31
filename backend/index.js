require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3000;
const connect = require('./config/db')
const taskRouter = require('./routes/tasks')
const authRouter = require('./routes/auth')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const allowedOrigins = [process.env.CLIENT_ORIGIN, 'http://localhost:5173']

app.use(express.json());
app.use(cors({origin : allowedOrigins}))
app.use('/tasks', taskRouter)
app.use('/auth', authRouter)
app.use(errorHandler)

async function startServer() {
  try {
    await connect()
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
