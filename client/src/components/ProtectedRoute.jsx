import { Navigate, useLocation} from "react-router-dom";
import { isTokenValid } from "../utils/isTokenValid";
function ProtectedRoute({children}) {

    const location = useLocation()
    const token = localStorage.getItem('token')

    if(isTokenValid(token)) return children
            
    localStorage.removeItem('token')    
    return <Navigate to="/login" state={{from : location.pathname}} />
    
}
export default ProtectedRoute

