import { useState } from "react";
import { format } from "date-fns";
import { FaPlus, FaCalendarAlt, FaUser } from "react-icons/fa";
import List from "../../components/dashboard/List";
import PostPopup from "../../modals/PostPopup";
import Navbar from "../../components/layout/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formatUsername = (username: string = "User") => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="relative pt-24 p-6 lg:p-12 lg:pt-32">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back, {formatUsername(user?.username)}!
                  </h1>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaCalendarAlt className="text-green-400" />
                    <p className="font-medium">{format(new Date(), "EEEE, MMMM do, yyyy")}</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                onClick={handleModalOpen}
              >
                <FaPlus className="text-sm" />
                Create New Post
              </button>
            </div>
          </div>
        </div>

        <List />
        
        {modalOpen && <PostPopup onClose={handleModalClose} />}
      </div>
    </div>
  );
}

export default Home;