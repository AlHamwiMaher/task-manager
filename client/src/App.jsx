import TaskList from './TaskList'

import { useState, useEffect } from 'react'

function App() {

const [tasks , setTasks] = useState([
  { id: 1, title: "Buy groceries" },
  { id: 2, title: "Walk the dog" },
  { id: 3, title: "Learn React" },
])
const [newTask , setNewTask] = useState("")



useEffect(() => {
  console.log("page loaded") ,[]
})

useEffect(() => {
  console.log("tasks changed:", tasks)
}, [tasks])

function handleAddTask (e){
  e.preventDefault()
  setTasks ([...tasks , {id : tasks.length +1 , title : newTask}])
  setNewTask("")
}

return(
 <div>
  <div>
    <h1>Task Manager</h1>
  </div>
    <TaskList title="My Tasks" tasks={tasks}/>
    <form onSubmit={handleAddTask}>
    <input type="text" name='newTaskAdd' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
      <button name='newTaskAdd' type='submit' >
          Add New Task
          </button>
          </form>
    </div>
  )
}

export default App