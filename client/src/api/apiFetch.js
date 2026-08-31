async function apiFetch({apiURL , method , token = null , body , fetchSignal = null} , navigate = null) {

    const fetchObject = {'method' : method}
    fetchObject.headers = {'Content-Type' : 'application/json'}
    if (token ) fetchObject.headers.Authorization =  'Bearer ' + token
    

    if (body) fetchObject.body = JSON.stringify(body)
    if (fetchSignal)    fetchObject.signal = fetchSignal
    
    const response = await fetch(apiURL , fetchObject)

    if (response.status === 401){
        console.log('Unauthorized Access!')
        if (navigate) navigate('/login')

        return response
    }
    return response

}
export default apiFetch