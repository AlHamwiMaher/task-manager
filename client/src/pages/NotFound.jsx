import '../styles/components/notfound.css'
import { Link } from "react-router-dom"
function NotFound (){
    
    return(
        <div className="notfound">
            <h1>Page Not Found</h1>
            <button className='home-button' type='button'><Link to="/login" className='home-link'>Go Home</Link></button>
        </div>
    ) 
}
export default NotFound