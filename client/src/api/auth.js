import { API_URL } from "../config"
import apiFetch from "./apiFetch"


export async function loginUser(credentials , navigate ) {
    const response =  await apiFetch({
        apiURL : API_URL + '/auth/login' , 
        method : 'POST' ,
        'body' : credentials} , 
        navigate 
        )
    return response
}

export async function registerUser(userInformation , navigate) {
    
    const response = await apiFetch({
        apiURL : API_URL + '/auth/register'
        ,method : 'POST' , 
        body : userInformation}
        , navigate
        )
    return response
}

export async function getDocument(token , fetchSignal ,navigate) {
    const response = await apiFetch({
        apiURL : API_URL + '/auth/account' , 
        method : 'get',
        token ,
        fetchSignal
    }, navigate
    )
    
    const data = await response.json()
    if (response.ok) return data

    throw new Error(data.message)
    
}

export async function deleteUser(token ,password) {
    const response = await apiFetch({
        apiURL : API_URL + '/auth/account' ,
        method : 'DELETE' ,
        body : {password},
        token
    }
    )

    if (response.ok) return response

    const data = await response.json()
    throw new Error(data.message)
}

export async function changePassword(token  ,oldPassword , newPassword , navigate) {

    if (oldPassword === newPassword)
        throw new Error('Write a Different New Password')
    if (newPassword.length < 8)
        throw new Error ('Password Must be 8 Characters at Least')
    const response = await apiFetch({
        apiURL : API_URL + '/auth/password',
        method : 'POST' ,
        token,
        body : {oldPassword , newPassword}
    } , navigate
    )
    
    const data = await response.json()
    
    if (response.ok) return data

    throw new Error(data.message)
    
}

export async function forgetPassword(email ,navigate) {
    
    const emailTrim = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/
    if (!emailRegex.test(emailTrim)) throw new Error("Enter a Valid Email")
    const response = await apiFetch({
        apiURL : API_URL + '/auth/forget-password' ,
        method : 'POST' ,
        body : {'email' : emailTrim}
    } , navigate
    )
    const data = await response.json()
    if (response.ok) return data.message
    throw new Error(data.message)
}
export async function checkTokenValidity(token) {
    const response = await apiFetch({
        apiURL : API_URL + '/auth/resetpassword?token=' + token ,
        method : 'GET'
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data.message
}

export async function resetPassword(token , newPassword) {
    const response = await apiFetch({
        apiURL : API_URL + '/auth/resetpassword?token=' + token ,
        method : 'POST' ,
        body : {newPassword}
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data.message
}
export  function logout(navigate){
        localStorage.removeItem('token')
        navigate('/login')
    }
