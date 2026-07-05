const express = require('express');
const app = express();
const PORT = 3000;
const connect = require('./config/db')
const taskRouter = require('./routes/tasks')
const authRouter = require('./routes/auth')
app.use(express.json());
app.use('/tasks', taskRouter)
app.use('/auth', authRouter)
connect()
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

