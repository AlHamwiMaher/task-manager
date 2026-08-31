import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/isTokenValid";
function PublicOnlyRoute({children}) {
    
    const token = localStorage.getItem('token')
    if(isTokenValid(token)){
       return <Navigate to="/dashboard" />
    }else{
        return children
    }
}
export default PublicOnlyRoute