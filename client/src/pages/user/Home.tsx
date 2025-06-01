import { useState } from "react";
import List from "../../components/dashboard/List"
import PostPopup from "../../modals/PostPopup";

function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  
  return (
    <div className="flex justify-between p-10">
      <List />
      <button onClick={handleModalOpen}>Add</button>
      {modalOpen && <PostPopup onClose={handleModalClose} />}
    </div>
  )
}

export default Home
