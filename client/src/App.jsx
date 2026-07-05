import TaskList from './components/TaskList'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import TaskDetail from './pages/Taskdetail'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import { useState, useEffect } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
function App() {

const [tasks , setTasks] = useState([
  { id: 1, title: "Buy groceries" },
  { id: 2, title: "Walk the dog" },
  { id: 3, title: "Learn React" },
])
const [newTask , setNewTask] = useState("")



useEffect(() => {
  console.log("page loaded") 
},[])

useEffect(() => {
  console.log("tasks changed:", tasks)
}, [tasks])

function handleAddTask (e){
  e.preventDefault()
  setTasks ([...tasks , {id : tasks.length +1 , title : newTask}])
  setNewTask("")
}

function handleDeleteTask (taskId){
  const originalTasks = tasks.filter(taskObject => taskObject.id != taskId)
  setTasks(originalTasks)
}

return(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/dashboard' element={        
        <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>} />

      <Route path='/tasks/:id' element={
        <ProtectedRoute>
          <TaskDetail />
          </ProtectedRoute>} />
          <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App