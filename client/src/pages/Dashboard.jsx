import { useState } from "react"
import { useEffect } from "react"
import { API_URL } from "../config"
import { useNavigate } from "react-router-dom"


function Dashboard () {
    const navigate = useNavigate()
    const [tasks , setTasks] = useState([])
    useEffect( () =>{ 
        async function fetchTasks () {
            let response = await fetch(API_URL +'/tasks')
            if (!response.ok){
                if (response.status === 401)
                    navigate('/login')
                console.log('Error ' + response.status)
            }else{
                let data = await response.json() 
                setTasks(data)
            }
        } fetchTasks()
    } , [])

    return (
        <div>
            <h1>Dashboard</h1>
            <ol>
                {tasks.map(task =>(
                    <li key={task._id}> {task.title} </li>
                ) )}
            </ol>
        </div>
        
        
    )
}
export default Dashboard