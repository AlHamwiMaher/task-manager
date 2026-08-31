import { API_URL } from "../config";
import apiFetch from "./apiFetch"

export async function getTasks(token , fetchSignal, navigate) {
    const response = await apiFetch({
        apiURL : API_URL +'/tasks' ,
        method : 'GET' , 
        token ,
        fetchSignal
    }, navigate)
        if (!response.ok ){
            const errorMessage = await response.json()
           throw new Error(errorMessage.message)
        }
        
        const data = await response.json()
        return data
}

export async function deleteTask(taskId , token , navigate) {
    const response = await apiFetch({
        apiURL : API_URL + '/tasks/' +taskId,
        method :'DELETE' , 
        token 
    }, navigate)
    if (!response.ok){
        const errorMessage = await response.json()
        throw new Error(errorMessage.message)
    }  
}

export async function addTask(token , taskTitle ,navigate ) {
    const response = await apiFetch({
        method : 'POST' ,
        apiURL : API_URL + '/tasks',
        body : {title : taskTitle},
        token
    } , navigate)
    const data = await response.json()
    if (!response.ok) throw new Error("Something went Wrong, " +data.message)
    return data
    
}
export async function updateTaskStatus(taskId, completed, token, navigate) {
    const response = await apiFetch({
        apiURL: API_URL + '/tasks/' + taskId,
        method: 'PUT',
        body: {done :completed},
        token
    }, navigate)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}