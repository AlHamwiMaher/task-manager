import { useNavigate , useLocation} from "react-router-dom"
function Login (){
    const navigate = useNavigate()
    const location = useLocation()
    function handleLogin (){
        const destination = location.state?.from || '/dashboard'
        navigate(destination)
    }
    return (
    <div>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Login</button>
    </div>
    )
}
export default Login