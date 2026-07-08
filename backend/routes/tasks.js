const express = require('express')
const router = express.Router()
const asyncHandler = require('./middleware/asyncHandler')
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = 
require('../controllers/taskController')
const { default: mongoose } = require('mongoose');

router.get('/' , authMiddleware, asyncHandler(getTasks))
  
router.get('/:id', authMiddleware, asyncHandler(getTaskById))

router.post('/' ,authMiddleware, asyncHandler(createTask))

router.put("/:id", authMiddleware, asyncHandler(updateTask));

router.delete("/:id" ,authMiddleware, asyncHandler(deleteTask))

module.exports = router