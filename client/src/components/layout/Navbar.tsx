import { useSelector } from "react-redux"; 
import type { RootState } from "../../store/store"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { logout } from "../../store/authSlice";  
import { MdLogout } from "react-icons/md";

function Navbar() {     
    const {user} = useSelector((state: RootState) => state.auth);     
    const navigate = useNavigate();     
    const dispatch = useDispatch()     
    
    const handleLogout = () => {         
        dispatch(logout());         
        navigate("/auth/login");     
    }

    const getUserInitial = () => {
        return user?.username?.charAt(0)?.toUpperCase() || "U";
    }

    return (     
        <div className='bg-gray-50 shadow-sm fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4'>       
            <h2 className="text-xl font-bold text-gray-800">POSTY</h2>       
            
            <div className="flex items-center gap-4">
    
                <div className="relative group">         
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors duration-200">
                        <span className="text-white font-semibold text-lg">
                            {getUserInitial()}
                        </span>
                    </div>

        
                    <div className="absolute right-0 top-12 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-max z-10">
                        <div className="text-sm space-y-1">
                            <p className="font-medium">{user?.username}</p>
                            <p className="text-gray-300">{user?.email}</p>
                        </div>
            
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                </div>

    
                <button 
                    onClick={handleLogout}
                    className="px-3 py-1 flex gap-1 items-center text-gray-700 bg-gray-100 hover:text-red-600 hover:bg-red-100 rounded text-sm transition-colors duration-200"
                >
                    Logout
                    <MdLogout/>
                </button>
            </div>     
        </div>   
    ) 
}  

export default Navbar