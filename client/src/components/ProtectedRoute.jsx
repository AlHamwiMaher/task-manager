import { Navigate, useNavigate } from "react-router-dom";
function ProtectedRoute({children}) {
    const isValid = localStorage.getItem('token')
    if(isValid){
       return children
    }else{
        return <Navigate to="/login" />
    }
}
export default ProtectedRoute