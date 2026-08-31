const Task = require('../models/Task')
const mongoose = require('mongoose')

async function getTasks (req , res, next){
    const id = req.user.id
    const tasks = await Task.find({owner : id})
    res.send(tasks)
}

async function getTaskById(req , res , next) {
    const userId = req.user.id
    const taskId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(taskId))
      return res.status(400).json({message : "Invalid ID"})

    const taskOfUser = await Task.findOne({_id: taskId ,owner : userId})
      
    if (!taskOfUser) {
        return  res.status(404).json({ message: 'Task Not Found' });
      } 
        return  res.status(200).json(taskOfUser)
    
}

async function createTask(req , res , next) {
    const id = req.user.id
    let title = req.body.title
    let newTask = {}
    if (title === undefined)
    return res.status(400).json({message : "Add a Valid Title"})

    if (typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json({message : "Enter a Title"})
    
    newTask.title = title
    newTask.done = false
    newTask.owner =  id

    const addTask = await Task.create(newTask)
    return res.status(201).json(addTask)

}
async function updateTask(req, res, next) {
    const { id: taskId } = req.params;
    const { done } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({
            message: "Invalid task id",
        });
    }

    if (done === undefined) {
        return res.status(400).json({
            message: "Specify the done field to update.",
        });
    }

    if (typeof done !== "boolean") {
        return res.status(400).json({
            message: "Done must be a boolean.",
        });
    }

    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            owner: userId,
        },
        { done },
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
}


async function deleteTask(req , res ,next) {
  const userId = req.user.id
  const taskId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(taskId))
    return res.status(400).json({message : "No Task Is Found"})

  const deletedTask = await Task.findOneAndDelete({_id : taskId ,owner : userId})
  if(!deletedTask){
    return res.status(404).json({message : "No Task Is Found"})
  }
    return res.status(204).send()
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }