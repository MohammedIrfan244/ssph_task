import { useSelector } from "react-redux"; 
import type { RootState } from "../../store/store"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { logout } from "../../store/authSlice";  
import { MdLogout } from "react-icons/md";
import { FaUser, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {     
    const { user } = useSelector((state: RootState) => state.auth);     
    const navigate = useNavigate();     
    const dispatch = useDispatch();     
    
    const handleLogout = () => {         
        try{
            dispatch(logout());         
        navigate("/auth/login");  
        }catch(error){
            toast.error("Logout failed. Please try again.");
            console.error("Logout failed:", error);
        }
    };

    const getUserInitial = () => {
        return user?.username?.charAt(0)?.toUpperCase() || "U";
    };

    return (     
        <div className='bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 lg:px-12'>       
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FaEdit className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                    POSTY
                </h2>
            </div>      
            
            <div className="flex items-center gap-4">
                <div className="relative group">         
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center cursor-pointer hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <span className="text-white font-bold text-lg">
                            {getUserInitial()}
                        </span>
                    </div>

                    <div className="absolute right-0 top-16 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none min-w-max z-10 border border-gray-700">
                        <div className="text-sm space-y-2">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-green-400 text-xs" />
                                <p className="font-semibold">{user?.username}</p>
                            </div>
                            <p className="text-gray-300 text-xs">{user?.email}</p>
                        </div>
            
                        <div className="absolute -top-1 right-6 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-md"
                >
                    <span className="text-sm">Logout</span>
                    <MdLogout className="text-lg" />
                </button>
            </div>     
        </div>   
    ); 
}  

export default Navbar;