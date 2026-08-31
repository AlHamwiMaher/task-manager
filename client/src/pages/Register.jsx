import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/auth"
import Spinner from "../components/Spinner"
import '../styles/components/register.css'
import { Link } from "react-router-dom"
function Register () {
    const [username , setUserName] = useState("")
    const [email , setUserEmail] = useState("")
    const [emailAssure , setEmailAssure] = useState("")
    const [password , setUserPassword] = useState("")
    const [errorMessages , setErrorMessages] = useState({nameError : null , emailError : null ,
         assureEmailError : null , passwordError : null ,generalError : null})
    const [isLoading , setIsLoading] = useState(false)    

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        if (isLoading) return
        let errorDetected = false
        setIsLoading(true)
        setErrorMessages({nameError : null , emailError : null ,
         assureEmailError : null , passwordError : null ,generalError : null})
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/

    if (typeof username !== "string" || username.trim().length === 0) {
        setErrorMessages((prev) => ({...prev , nameError : "Enter a Valid Username"}))
        errorDetected = true
    }
    

    if (typeof email !== "string" || email.trim().length === 0 || !emailRegex.test(email) ) {
        setErrorMessages((prev) => ({...prev , emailError : "Enter a Valid Email"}))
        errorDetected = true
    }

    

    if(typeof emailAssure !== "string" || emailAssure.trim().length === 0 || !emailRegex.test(emailAssure)){
        setErrorMessages((prev) => ({...prev , assureEmailError : "Enter a Valid Email"}))
        errorDetected = true
    }

    if (email.trim() !== emailAssure.trim() && !errorDetected) {
        setErrorMessages((prev) => ({...prev , generalError : "Emails Are Not Matching"}))
        errorDetected = true
    }

    if (typeof password !== "string" || password.trim().length < 8) {
        setErrorMessages((prev) => ({...prev , passwordError : "Password Must Be 8 Characters At Least"}))
        errorDetected = true
    }
    if (errorDetected) {
        setIsLoading(false)
        return
    }


    const usernameTrim = username.trim()
    const emailTrim = email.trim()
    let response

    try {
        response = await registerUser({username : usernameTrim , email : emailTrim ,
             password } , navigate)
    } catch (error) {
        setIsLoading(false)
        setErrorMessages({generalError : error.message})
        return
    }

    if (!response.ok){
        const data = await response.json()
        setIsLoading(false)
        setErrorMessages({generalError : data.message})
        return
    }

    setIsLoading(false)
    navigate('/login')
    return

    }
    
    return (
        <div className="register-page">
            <div className="register-form-wrapper">
                <div className="register-title-wrapper">
                    <h1 className="register-title" >Task Manager - Register</h1>
                    <p className="register-subtitle">Your way to Organize Your Life</p>
                    <Link className="register-link" to="/login">Already Have an Account? Sign In</Link>
                </div>
                <form onSubmit={handleRegister} className="register-form">
                    <div className="register-wrapper">
                        <input type="text" disabled={isLoading} className="register-input" placeholder=" " id="username" value={username} onChange={e =>{setUserName(e.target.value)}}/>
                        <label htmlFor="username" className="register-label">Write Your Name</label>
                    </div>
                    {errorMessages.nameError &&
                        <p className="register-error">{errorMessages.nameError}</p>
                    }
                    <div className="register-wrapper">
                        <input type="email" disabled={isLoading} className="register-input" id="email" placeholder=" " value={email} onChange={e =>{setUserEmail(e.target.value)}}/>
                        <label htmlFor="email" className="register-label">Write Your Email</label>
                    </div>
                    {errorMessages.emailError &&
                        <p className="register-error" >{errorMessages.emailError}</p>
                    }
                    <div className="register-wrapper">
                        <input type="email" disabled={isLoading} className="register-input" id="emailConfirm" placeholder=" " value={emailAssure} onChange={e =>{setEmailAssure(e.target.value)}}/>
                        <label className="register-label" htmlFor="emailConfirm">Confirm Your Email</label>
                    </div>
                    {errorMessages.assureEmailError &&
                        <p className="register-error">{errorMessages.assureEmailError}</p>
                    }
                    <div className="register-wrapper">
                        <input type="password" disabled={isLoading} id="password" className="register-input" placeholder=" " value={password} onChange={e =>{setUserPassword(e.target.value)}}/>
                        <label htmlFor="password" className="register-label">Write Your Password</label>
                    </div>
                    {errorMessages.passwordError &&
                        <p className="register-error">{errorMessages.passwordError}</p>
                    }
                    <button className="register-button" type="submit" disabled={isLoading}>Register</button>
                    {isLoading && <Spinner size="small" />}
                    {errorMessages.generalError &&
                        <p className="register-error">{errorMessages.generalError}</p>
                    }
                </form>
            </div>
        </div>


    )
}
export default Register