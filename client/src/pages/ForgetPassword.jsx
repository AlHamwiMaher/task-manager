import { useState } from "react"
import { forgetPassword } from "../api/auth"
import  Spinner  from '../components/Spinner'
import { Link } from "react-router-dom"
import '../styles/components/forgetpassword.css'

function ForgetPassword(){

    const [email , setEmail] =useState("")
    const [errorMessage , setErrorMessage] = useState("")
    const [isLoading , setIsLoading] = useState(false)
    const [success , setSuccess] = useState("")

    async function forgetPasswordLink(e) {
        e.preventDefault()
        if(isLoading) return
        setErrorMessage("")
        setSuccess("")
        try {
           setIsLoading(true)
            const response = await forgetPassword(email)
            setSuccess(response)
            return
        } catch (error) {
            setErrorMessage(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="forget-password">
            <div className="forget-password-form-wrapper">
                <div className="forget-password-title-wrapper">
                    <button className="back-button" type="button"><Link className="back-link" to='/login'>{'<'}</Link></button>
                    <h1 className="forget-password-title">Find your account</h1>
                </div>
                <form className="forget-password-form" onSubmit={forgetPasswordLink}>
                    <div className="forget-password-input-wrapper">
                        <input type="email" id="email-input" value={email} onChange={e => {setEmail(e.target.value)}} className="forget-password-input" placeholder=" " />
                        <label htmlFor="email-input" className="forget-password-label">Enter Your Email</label>
                    </div>
                    <button type="submit" className="forget-password-button" disabled={isLoading}>Submit</button>
                    {isLoading && <Spinner size="small" />}
                    <div className="forget-password-response">
                        {success && <p className="forget-password-success">{success}</p>}
                        {errorMessage && <p className="forget-password-error">{errorMessage}</p>}
                    </div>
                </form>
            </div>

        </div>
    )
}
export default ForgetPassword