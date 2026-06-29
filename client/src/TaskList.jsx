function TaskList (props){
return (
    <div>
        <ul>
            {props.tasks.map(task =>(
                <li>{task.title}</li>
            ))}
        </ul>
    </div>
)
}
export default TaskList