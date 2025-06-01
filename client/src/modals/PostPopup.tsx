import { useState } from "react";
import axiosErrorManager from "../lib/utils/axiosError";
import api from "../lib/utils/axios";
import { toast } from "react-toastify";

interface IPostPopupProps {
    onClose: () => void;
}

function PostPopup({onClose}: IPostPopupProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setTitle(value);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setContent(value);
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
        const response = await api.post("/posts", {
            title: title.trim(),
            content: content.trim(),
        });
        if(response.data.success){
            setTitle("");
            setContent("");
            onClose();
            window.location.reload();
        } 
    }catch(error){
        toast.error("Failed to create post. " + axiosErrorManager(error));
        console.error(axiosErrorManager(error));
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
        onClose(); 
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-200 hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
          <button 
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 rounded-full p-1"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 hover:border-gray-300"
              required
            />
            <div className="text-right text-xs text-gray-500 mt-2 font-medium">
              {title.length}/25
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your post content..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 hover:border-gray-300 resize-none"
              required
            />
            <div className="text-right text-xs text-gray-500 mt-2 font-medium">
              {content.length}/500
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold shadow-lg hover:shadow-xl disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostPopup;