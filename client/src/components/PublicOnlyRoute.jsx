import { Navigate } from "react-router-dom";
function PublicOnlyRoute({children}) {
    const isValid = localStorage.getItem('token')
    if(isValid){
       return <Navigate to="/dashboard" />
    }else{
        return children
    }
}
export default PublicOnlyRoute