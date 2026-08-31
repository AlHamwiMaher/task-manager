import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getTasks, addTask, updateTaskStatus, deleteTask} from "../api/tasksFetch"
import { logout } from "../api/auth"
import '../styles/components/dashboard.css'
import Spinner from "../components/Spinner"

function Dashboard() {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [errorDelete, setErrorDelete] = useState({
        id: null,
        message: null
    })

    const [retryTrigger, setRetryTrigger] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSmall, setIsLoadingSmall] = useState(false)

    const isFetchingRef = useRef(false)
    const isDeleting = useRef(false)

    const [showTaskForm, setShowTaskForm] = useState(false)

    const [showEditForm, setShowEditForm] = useState(false)

    const [taskTitle, setTaskTitle] = useState('')

    const [addError, setAddError] = useState('')
    const [addSuccess, setAddSuccess] = useState('')

    const [selectedTask, setSelectedTask] = useState(null)


    function handleRetry() {

        if (isFetchingRef.current) return

        isFetchingRef.current = true

        setRetryTrigger(prev => prev + 1)
    }


    async function handleDelete(taskId) {

        if (isDeleting.current) return

        isDeleting.current = true

        setErrorDelete({
            id: null,
            message: null
        })

        try {

            await deleteTask(
                taskId,
                localStorage.getItem('token'),
                navigate
            )

            setTasks(currentState =>
                currentState.filter(task => task._id !== taskId)
            )

        } catch (error) {

            setErrorDelete({
                id: taskId,
                message: error.message
            })

        } finally {

            isDeleting.current = false
        }
    }


    async function handleComplete(taskId, currentDone) {

        if (isFetchingRef.current) return

        isFetchingRef.current = true

        setErrorDelete({
            id: null,
            message: null
        })

        try {

            const updatedTask = await updateTaskStatus(
                taskId,
                !currentDone,
                localStorage.getItem('token'),
                navigate
            )

            setTasks(currentState =>
                currentState.map(task =>
                    task._id === taskId
                        ? updatedTask
                        : task
                )
            )

        } catch (error) {

            setErrorDelete({
                id: taskId,
                message: error.message
            })

        } finally {

            isFetchingRef.current = false
        }
    }


    useEffect(() => {

        const controller = new AbortController()

        async function fetchTasks() {

            setIsLoading(true)

            try {

                setErrorMessage("")

                const data = await getTasks(
                    localStorage.getItem('token'),
                    controller.signal,
                    navigate
                )

                setTasks(data)

            } catch (error) {

                if (error.name === 'AbortError')
                    return

                setErrorMessage(error.message)

            } finally {

                isFetchingRef.current = false
                setIsLoading(false)
            }
        }

        fetchTasks()

        return () => {
            controller.abort()
        }

    }, [retryTrigger])


    async function handleAddTask(e) {

        e.preventDefault()

        if (isFetchingRef.current) return

        setAddError('')
        setAddSuccess('')

        isFetchingRef.current = true
        setIsLoadingSmall(true)

        try {

            const response = await addTask(
                localStorage.getItem('token'),
                taskTitle,
                navigate
            )

            setTasks(prev => [...prev, response])

            setTaskTitle('')

            setAddSuccess('Task added successfully')

        } catch (error) {

            setAddError(error.message)

        } finally {

            setIsLoadingSmall(false)
            isFetchingRef.current = false
        }
    }


    if (isLoading) {
        return <Spinner />
    }


    if (errorMessage) {

        return (
            <div>

                <p>{errorMessage}</p>

                <button
                    onClick={handleRetry}
                    disabled={isLoading}
                >
                    Retry
                </button>

            </div>
        )
    }


    if (showTaskForm) {

        return (
            <div className="backdrop">

                <form className="taskform" onSubmit={handleAddTask}>

                    <h2 className="add-title">
                        Add New Task
                    </h2>


                    <div className="add-input-wrapper">

                        <input
                            type="text"
                            placeholder=" "
                            className="add-input"
                            onChange={e =>
                                setTaskTitle(e.target.value)
                            }
                            value={taskTitle}
                            id="tasktitle"
                        />

                        <label
                            htmlFor="tasktitle"
                            className="add-label"
                        >
                            Write Your Task
                        </label>

                    </div>


                    <div className="add-button-wrapper">

                        <button
                            className="add-button"
                            type="button"
                            onClick={() => {
                                setShowTaskForm(false)
                                setTaskTitle('')
                                setAddError('')
                                setAddSuccess('')
                            }}
                            disabled={isLoadingSmall}
                        >
                            Cancel
                        </button>


                        <button
                            className="add-button"
                            type="submit"
                            disabled={isLoadingSmall}
                        >
                            Add
                        </button>

                    </div>


                    {isLoadingSmall && (
                        <Spinner size="small" />
                    )}


                    <div className="add-response">

                        {addError && (
                            <p className="add-error">
                                {addError}
                            </p>
                        )}

                        {addSuccess && (
                            <p className="add-success">
                                {addSuccess}
                            </p>
                        )}

                    </div>

                </form>

            </div>
        )
    }


    return (

        <div className="dashboard">


            <div className="dashboard-header">

                <div className="dashboard-logo">

                    <h1>Task Manager</h1>

                </div>


                <div className="dashboard-nav">

                    <Link
                        to="/profile"
                        className="dashboard-profile-link"
                    >
                        Profile
                    </Link>


                    <button
                        type="button"
                        className="dashboard-nav-button"
                        onClick={() => {logout(navigate)}}
                    >
                        Logout
                    </button>

                </div>

            </div>



            <div className="dashboard-main">


                <div className="dashboard-welcome">

                    <h2>Welcome Back!</h2>

                    <p>
                        Manage your tasks and stay productive.
                    </p>

                </div>



                <div className="dashboard-stats">


                    <div className="dashboard-stat-card">

                        <h3>Total Tasks</h3>

                        <p>
                            {tasks.length}
                        </p>

                    </div>



                    <div className="dashboard-stat-card">

                        <h3>Completed</h3>

                        <p>
                            {
                                tasks.filter(
                                    task => task.done
                                ).length
                            }
                        </p>

                    </div>



                    <div className="dashboard-stat-card">

                        <h3>Remaining</h3>

                        <p>
                            {
                                tasks.filter(
                                    task => !task.done
                                ).length
                            }
                        </p>

                    </div>

                </div>



                <div className="dashboard-tasks">


                    <div className="dashboard-tasks-header">

                        <h2>Your Tasks</h2>


                        <button
                            type="button"
                            className="dashboard-add-button"
                            onClick={() => setShowTaskForm(true)}
                        >
                            + Add Task
                        </button>

                    </div>



                    {tasks.length === 0 ? (

                        <div className="dashboard-empty">

                            <h3>No Tasks Yet</h3>

                            <p>
                                Start by creating your first task.
                            </p>

                        </div>

                    ) : (

                        <div className="dashboard-task-list">


                            {tasks.map(task => (

                                <div
                                    className="dashboard-task-card"
                                    key={task._id}
                                >


                                    <div className="dashboard-task-content">


                                        <div className="dashboard-task-title">


                                            <h3>
                                                {task.title}
                                            </h3>


                                            <span
                                                className={
                                                    task.done
                                                        ? 'dashboard-task-status completed'
                                                        : 'dashboard-task-status pending'
                                                }
                                            >
                                                {
                                                    task.done
                                                        ? 'Completed'
                                                        : 'Pending'
                                                }
                                            </span>


                                        </div>


                                    </div>



                                    <div className="dashboard-task-actions">


                                        <button
                                            type="button"
                                            className="dashboard-task-complete"
                                            onClick={() =>
                                                handleComplete(
                                                    task._id,
                                                    task.done
                                                )
                                            }
                                            disabled={isFetchingRef.current}
                                        >
                                            {
                                                task.done
                                                    ? 'Mark Undone'
                                                    : 'Mark Done'
                                            }
                                        </button>


                                        <button
                                            type="button"
                                            className="dashboard-task-delete"
                                            onClick={() =>
                                                handleDelete(task._id)
                                            }
                                            disabled={isDeleting.current}
                                        >
                                            Delete
                                        </button>


                                    </div>



                                    {errorDelete.id === task._id && (

                                        <p className="dashboard-delete-error">
                                            {errorDelete.message}
                                        </p>

                                    )}


                                </div>

                            ))}


                        </div>

                    )}


                </div>


            </div>


        </div>
    )
}


export default Dashboard