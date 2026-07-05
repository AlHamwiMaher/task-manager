const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const authMiddleware = require('../middleware/auth');
const { default: mongoose } = require('mongoose');

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
    const userId = req.user.id
    const taskId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(taskId))
      return res.status(400).json({message : "Invalid ID"})

    const taskOfUser = await Task.findOne({_id: taskId ,owner : userId})
      
    if (!taskOfUser) {
        return  res.status(404).json({ message: 'Task Not Found' });
      } 
        return  res.status(200).json(taskOfUser)
      
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }

});

router.post('/' ,authMiddleware, async (req, res) =>{
    try{

      const id = req.user.id
      let title = req.body.title
      let newTask = {}
      if (title === undefined)
        return res.status(400).json({message : "Add a String Title and a State"})

      if (typeof title !== "string" || title.trim().length === 0)
        return res.status(400).json({message : "Enter a Title"})
      
      newTask.title = title
      newTask.done = false
      newTask.owner =  id

      const addTask = await Task.create(newTask)
      return res.status(201).json(addTask)

    } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }


})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { title, done } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const updatedTask = {};

    
    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        title.trim().length === 0 ||
        title.trim().length > 150
      ) {
        return res.status(400).json({
          message: "Title must be a non-empty string under 150 characters.",
        });
      }

      updatedTask.title = title.trim();
    }

    
    if (done !== undefined) {
      if (typeof done !== "boolean") {
        return res.status(400).json({
          message: "Done must be a boolean.",
        });
      }

      updatedTask.done = done;
    }

    
    if (Object.keys(updatedTask).length === 0) {
      return res.status(400).json({
        message: "Specify at least one field to update.",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        owner: userId,
      },
      updatedTask,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json(task);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

router.delete("/:id" ,authMiddleware, async (req, res) => {
  try{
  const userId = req.user.id
  const taskId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(taskId))
    return res.status(400).json({message : "No Task Is Found"})

  const deletedTask = await Task.findOneAndDelete({_id : taskId ,owner : userId})
  if(!deletedTask){
    return res.status(404).json({message : "No Task Is Found"})
  }
    return res.status(204).send()
  
} catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router