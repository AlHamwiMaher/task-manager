import { useNavigate , useLocation, useFetchers} from "react-router-dom"
import { API_URL } from "../config"
import { useEffect, useState } from "react"
import  apiFetch  from "../api/apiFetch"
import { loginUser } from "../api/auth"
import { useRef } from "react"
import  Spinner  from '../components/Spinner'
import "../styles/components/login.css"
import { Link } from "react-router-dom"
function Login (){
    const navigate = useNavigate()
    const location = useLocation()
    const [email , setEmail] =useState("")
    const [password , setPassword] =useState("")
    const [errorMessage , setErrorMessage] = useState("")
    const [isLoading , setIsLoading] = useState(false)    
    const isFetchingRef = useRef(false)
    const destination = location.state?.from || '/dashboard'

    async function handleLogin(e) {
        e.preventDefault()
        if (isFetchingRef.current) return
        isFetchingRef.current = true
        setIsLoading(true)
       if (email.trim().length === 0){
            setErrorMessage("Enter a Valid Email")
            setIsLoading(false)
            isFetchingRef.current = false
            return
       }
        
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/
       
        if (!emailRegex.test(email.trim())){
            setErrorMessage("Enter a Valid Email")
            setIsLoading(false)
            isFetchingRef.current = false
            return
        }

       if (password.trim().length < 8){
            setErrorMessage("Password must be atleast 8 characters and numbers")
            setIsLoading(false)
            isFetchingRef.current = false
            return
       }
       try {
            const response = await loginUser({ email , password} , navigate)
            
            if (!response.ok){
                const errorData = await response.json()
                setErrorMessage(errorData.message)
                setIsLoading(false)
                isFetchingRef.current = false
                return
            }
            const data = await response.json()
            const token = data.token
            localStorage.setItem('token' , token)
            setIsLoading(false)
            isFetchingRef.current = false
            navigate(destination)
            return
       } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
            isFetchingRef.current = false
            return
       }    
    }
    
        

    
    return (
    <div className="login-page">
        <div className="form-wrapper">
            <div className="title-wrapper">
                <h1 className="login-title">Task Manager - Login</h1>
                <h2 className="login-subtitle">Welcome Back</h2>
                <Link className="login-link" to="/recoveraccount">Forgot Your Password?</Link>
                <Link className="login-link" to="/register">Register an Account</Link>
                
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="login-wrapper">
                    <input className="login-input" placeholder=" " disabled={isLoading} type="text" id="email" value={email} onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                    <label className="login-label" htmlFor="email">Write Your Email</label>
                </div>
                <div className="login-wrapper">
                    <input className="login-input" placeholder=" " disabled={isLoading} type="password" id="password" value={password} onChange={e =>{
                        setPassword(e.target.value)
                    }}/>
                   <label className="login-label" htmlFor="password">Write Your Password</label>
                </div>
                <button className="login-button" type="submit" disabled={isLoading}>Login</button>
                {isLoading && <Spinner size="small" />}
                <div className="error-wrapper">
                    {errorMessage && <p className="login-error">{errorMessage}</p>}
                </div>
            </form>
        </div>
    </div>
    )
}
export default Login