import { useState } from "react";
import { format } from "date-fns";
import List from "../../components/dashboard/List"
import PostPopup from "../../modals/PostPopup";
import Navbar from "../../components/layout/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {user}= useSelector((state: RootState) => state.auth);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formatUsername = (username: string="User") => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  
  return (
    <div className="relative pt-20 p-5 lg:p-10 lg:pt-24">
      <Navbar />
      <div className="mb-6 flex items-start justify-between">
        <div>
        <h1 className="text-2xl text-gray-600 font-bold mb-2">Welcome {formatUsername(user?.username)}</h1>
        <p className="text-gray-500 text-sm font-semibold">{format(new Date(), "EEEE, MMMM do, yyyy")}</p>
        </div>
      <button className="px-4 text-sm py-1 rounded-md text-gray-600 font-semibold bg-green-400" onClick={handleModalOpen}>Create new post</button>
      </div>
      <List />
      {modalOpen && <PostPopup onClose={handleModalClose} />}
    </div>
  )
}

export default Home