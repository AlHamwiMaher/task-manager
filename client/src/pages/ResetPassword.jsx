import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { checkTokenValidity } from "../api/auth";
import Spinner from '../components/Spinner'
import { resetPassword } from "../api/auth";
import '../styles/components/resetpassword.css'

function ResetPassword(){

    const [password , setPassword] = useState("")
    const [passwordConfirm , setPasswordConfirm] = useState("")
    const [isLoading , setIsLoading] = useState(true)
    const [isLoadingSmall , setIsLoadingSmall] = useState(false)
    const [success , setSuccess] = useState("")
    const [errorMessage , setErrorMessage] = useState("")
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const isValidToken = useRef()

    useEffect(
        () =>{ 
            async function fireCheckValidity() {
                if(!token){
                    isValidToken.current = false
                    setIsLoading(false)
                    return
                }
                setIsLoading(true)
                try {
                    
                    const response  = await checkTokenValidity(token)
                    isValidToken.current = true
                } catch (error) {
                    isValidToken.current = false
                
                }finally{
                    setIsLoading(false)
                }
            } fireCheckValidity()
        } , []
    )

    async function handlePasswordChange(e) {
        e.preventDefault()
        setErrorMessage("")
        setSuccess("")
        if (password !== passwordConfirm) {
            setErrorMessage("Passwords are not matching , try again")
            return
        }
        setIsLoadingSmall(true)
        const newPassword = password
        try {
            const response  = await resetPassword(token , newPassword)
            setSuccess(response)
        } catch (error) {
            setErrorMessage(error.message)
        }finally{
            setIsLoadingSmall(false)
        }
    }
    
    if(isLoading) return <Spinner />
    if(!isValidToken.current){
        return (
            <div className="invalid-token">
                <h2 className="invalid-token-title">Reset Link is Expired! , Request a New One</h2>
            </div>
        )
    }
    return(
        <div className="reset-password">
            <div className="reset-password-form-wrapper">
                <h2 className="reset-password-title">Reset Your Password</h2>
                <form onSubmit={handlePasswordChange} className="reset-password-form">
                    <div className="reset-password-input-wrapper">
                        <input type="password" placeholder=" " disabled={isLoadingSmall} id="password" className="reset-password-input" value={password} onChange={e => (setPassword(e.target.value))}/>
                        <label htmlFor="password" className="reset-password-label">Enter New Password</label>
                    </div>
                    <div className="reset-password-input-wrapper">
                        <input type="password" placeholder=" " id="passwordConfirm" className="reset-password-input" disabled={isLoadingSmall} value={passwordConfirm} onChange={e => (setPasswordConfirm(e.target.value))}/>
                        <label htmlFor="passwordConfirm" className="reset-password-label">Confirm Password</label>
                    </div>
                    <button  disabled={isLoadingSmall} className="reset-password-button" type="submit">Change Password</button>
                    {isLoadingSmall && <Spinner size="small" />}
                    <div className="reset-password-response">
                        {success && <p className="reset-password-success">{success}</p>}
                        {errorMessage && <p className="reset-password-error">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ResetPassword