require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Connection error:', err));
const taskRouter = require('./routes/tasks')
const authRouter = require('./routes/auth')
app.use(express.json());
app.use('/tasks', taskRouter)
app.use('/auth', authRouter)


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

