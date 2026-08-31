function TaskList (props){
return (
    <div>
        <ul>
            {props.tasks.map(task =>(
                <li>{task.title} <button type="button" onClick={() =>
                    props.delete(task.id)
                }>
                Delete</button>
                </li>
            ))}
        </ul>
    </div>
)
}
export default TaskList