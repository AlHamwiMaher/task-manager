const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const authMiddleware = require('../middleware/auth')

router.get('/' , authMiddleware, async (req, res) =>{
  const tasks = await Task.find()
  res.send(tasks)
  });
  
router.get('/:id', authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (task == null) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.status(200).json(task)
  }
});

router.post('/' ,authMiddleware, async (req, res) =>{
  let newTitle = req.body.title
  const newTask = new Task({title :newTitle , done: false})
  await newTask.save()
  res.status(201).json(newTask)
})

router.put("/:id" , authMiddleware, async (req, res) =>{
  let taskId = req.params.id
  const editedTask = await Task.findByIdAndUpdate(req.params.id ,{title : req.body.title , done : req.body.done}, {new: true} )
  if(editedTask ==null){
    res.status(404).json({ message: "no task is found"})
  }else{
    
    res.status(200).json(editedTask)
  }
})

router.delete("/:id" ,authMiddleware, async (req, res) => {
  const taskId = req.params.id
  const deletedTask = await Task.findByIdAndDelete(taskId)
  if(deletedTask !== null){
    res.status(200).json({message : "Deleted successfully"})
  }else{
    res.status(404).json({message : "No task is found"})
  }
})

module.exports = router