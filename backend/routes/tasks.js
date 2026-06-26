const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const authMiddleware = require('../middleware/auth')

router.get('/' , authMiddleware, async (req, res) =>{
    try{  
      const id = req.user.id
      const tasks = await Task.find({owner : id})
      res.send(tasks)
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message })
  }
  });
  
router.get('/:id', authMiddleware, async (req, res) => {
  try{
    const id = req.user.id
    const tasksOfUser = await Task.findOne({_id: req.params.id ,owner : id})
      if (tasksOfUser == null) {
        res.status(404).json({ message: 'No Tasks found' });
      } else {
        res.status(200).json(tasksOfUser)
      }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }

});

router.post('/' ,authMiddleware, async (req, res) =>{
    try{
      const id = req.user.id
      let newTitle = req.body.title
      const newTask = new Task({title :newTitle , done: false, owner : id})
      await newTask.save()
      res.status(201).json(newTask)
    } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }


})

router.put("/:id" , authMiddleware, async (req, res) =>{
  try{
    const userId = req.user.id 
    let taskId = req.params.id
    const editedTask = await Task.findOneAndUpdate({_id : taskId ,owner : userId} , {title :req.body.title, done : req.body.done}, {new: true})
    if(editiedTask ==null){
        res.status(404).json({ message: "no task is found"})
      }else{ 
        res.status(200).json(editedTask)
      }
    } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }


})

router.delete("/:id" ,authMiddleware, async (req, res) => {
  try{
  const id = req.user.id
  const taskId = req.params.id
  const deletedTask = await Task.findOneAndDelete({_id : taskId ,owner : id})
  if(deletedTask !== null){
    res.status(200).json({message : "Deleted successfully"})
  }else{
    res.status(404).json({message : "No task is found"})
  }
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router