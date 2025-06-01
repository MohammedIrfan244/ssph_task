import { useState } from "react";
import axiosErrorManager from "../lib/utils/axiosError";
import api from "../lib/utils/axios";

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
      className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {title.length}/25
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your post content..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {content.length}/500
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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