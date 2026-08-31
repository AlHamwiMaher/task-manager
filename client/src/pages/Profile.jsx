import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import Spinner from "../components/Spinner"
import '../styles/components/profile.css'
import { logout } from "../api/auth"
import { Link } from "react-router-dom"
import { getDocument , deleteUser, changePassword } from "../api/auth"


function Profile(){

    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [userDocument, setUserDocument] = useState(null) 
    
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [changingError, setChangingError] = useState('')
    const [oldPassword , setOldPassword] = useState('')
    const [newPassword , setNewPassword] = useState('')
    const [passwordResponse , setPasswordResponse] = useState('')
    const [password , setPassword] = useState('')

    const [retryTrigger ,setRetryTrigger] = useState(0)

    const [isDeletingLoader, setIsDeletingLoader] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const [confirmDelete , setConfirmDelete] = useState(false)

    const passwordGuard = useRef()
    const isDeleting = useRef()
    const navigate = useNavigate()
   
    useEffect(() => {
    const controller = new AbortController()

    async function fetchUserInfo() {
        try {
            setIsLoading(true)

            const userDocumentFetch = await getDocument(
                localStorage.getItem('token'),
                controller.signal,
                navigate
            )

            if (userDocumentFetch === null) {
                setErrorMessage('Something went wrong, please try again')
                return
            }

            setUserDocument(userDocumentFetch)

        } catch (error) {
            if (error.name === 'AbortError') return
            setErrorMessage(error.message)

        } finally {
            setIsLoading(false)
        }
    }

    fetchUserInfo()

    return () => {
        controller.abort()
    }

}, [retryTrigger])

    async function handleDelete() {
        if (isDeleting.current) return
        isDeleting.current = true
        setDeleteError('')
        try {
            setIsDeletingLoader(true)
            await deleteUser(
                localStorage.getItem('token'),
                password
            )
            localStorage.removeItem('token')
            navigate('/login')
            
        } catch (error) {
            setDeleteError(error.message)
        }finally{
            isDeleting.current = false
            setIsDeletingLoader(false)
        }
    }

    async function handleChange() {
        if (passwordGuard.current) return
        passwordGuard.current = true
        setChangingError('')
        setIsChangingPassword(true)
        try {
            const response = await changePassword(
                localStorage.getItem('token'),
                oldPassword.trim() ,
                newPassword.trim() ,
                navigate
            )
            setPasswordResponse(response.message)
        } catch (error) {
          setChangingError(error.message)  
        }finally{
            passwordGuard.current =false
            setIsChangingPassword(false)   
        }
    }



    if (confirmDelete){
        return(
            <div className='backdrop'>
                <div className='backdrop-wrapper'>
                    <p className="backdrop-text">You Are Going To Delete Your Account, Are You Sure?!</p>
                    <div className="profile-input-wrapper">
                        <input type="password" placeholder=" " id="password" className="profile-input" value={password} onChange={e =>{setPassword(e.target.value)}}/>
                        <label htmlFor="password" className="profile-label">Enter Your Password</label>
                    </div>
                    <div className="backdrop-button-wrapper">
                        <button className="profile-button-cancel" onClick={() => (setConfirmDelete(false))}>Cancel</button>
                        <button className="profile-button-delete" onClick={handleDelete} disabled={isDeletingLoader}>Delete</button>
                    </div>
                    {isDeletingLoader && <Spinner size='small'/>}
                    <div className="delete-account-response">
                        {deleteError && <p className="delete-error">{deleteError}</p>}
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) return <Spinner />

    if (errorMessage || userDocument === null) return <p>{errorMessage}</p>
     
    return (
        <div className="profile">
            <div className="profile-wrapper" >
                 <button className="profile-back-button" type="button"><Link className="back-link" to='/dashboard'>{'<'}</Link></button>
                <div className="profile-title-wrapper">
                    <h1 className="profile-title">Task Manager - Profile</h1>
                    <h3 className="profile-subtitle">Hello {userDocument.username}, your Email is {userDocument.email}</h3>
                    <div className="profile-button-wrapper">
                        <button type="button" className="profile-button" onClick={() => (setConfirmDelete(true))}>Delete Account</button>
                        <button type="button" className="profile-button" onClick={() =>{logout(navigate)}}>Logout</button>
                    </div>
                </div>
                <form className="profile-form" onSubmit={e => (e.preventDefault())}>
                    <h4 className="profile-text">Change Your Password</h4>
                    <div className="profile-input-wrapper">
                        <input type="password" placeholder=" " id="password" className="profile-input" value={oldPassword} onChange={e =>{setOldPassword(e.target.value)}}/>
                        <label htmlFor="password" className="profile-label">Enter Your Password</label>
                    </div>
                    <div className="profile-input-wrapper">
                        <input type="password" placeholder=" " id="passwordconfirm" className="profile-input" value={newPassword} onChange={e => {setNewPassword(e.target.value)}}/>
                        <label htmlFor="passwordconfirm" className="profile-label">Enter Your New Password</label>
                    </div>
                    <button type="submit" className="profile-button" disabled={isChangingPassword} onClick={handleChange}>Change Password</button>
                    <p className="change-password-response">
                        {isChangingPassword && <Spinner size='small'/>}
                        
                        {changingError &&
                        <p className="password-error">{changingError}</p>
                        }
                        {passwordResponse && 
                        <p className="password-success">{passwordResponse}</p>
                        }   
                    </p>
                </form>
                
            </div>
        </div>
    )

}
export default Profile 