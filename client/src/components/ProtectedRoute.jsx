import { Navigate, useLocation} from "react-router-dom";
function ProtectedRoute({children}) {
    const location = useLocation()
    const isValid = localStorage.getItem('token')
    if(isValid){
       return children
    }else{
        return <Navigate to="/login" state={{from : location.pathname}} />
    }
}
export default ProtectedRoute

