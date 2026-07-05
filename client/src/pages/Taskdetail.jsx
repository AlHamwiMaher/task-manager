
import { useParams } from "react-router-dom"
function TaskDetail (){
    const {id} = useParams()
    return <h1>Task ID : {id}</h1>
}
export default TaskDetail