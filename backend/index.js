require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Connection error:', err));
const Task = require('./models/Task');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/tasks' , async (req, res) =>{
  const tasks = await Task.find()
  res.send(tasks)
  });
  
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (task == null) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.status(200).json(task)
  }
});

app.post('/tasks' , async (req, res) =>{
  let newTitle = req.body.title
  const newTask = new Task({title :newTitle , done: false})
  await newTask.save()
  res.status(201).json(newTask)
})

app.put("/tasks/:id" , async (req, res) =>{
  let taskId = req.params.id
  const editedTask = await Task.findByIdAndUpdate(req.params.id ,{title : req.body.title , done : req.body.done}, {new: true} )
  if(editedTask ==null){
    res.status(404).json({ message: "no task is found"})
  }else{
    
    res.status(200).json(editedTask)
  }
})

app.delete("/tasks/:id" , async (req, res) => {
  const taskId = req.params.id
  const deletedTask = await Task.findByIdAndDelete(taskId)
  if(deletedTask !== null){
    res.status(200).json({message : "Deleted successfully"})
  }else{
    res.status(404).json({message : "No task is found"})
  }
})

  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

