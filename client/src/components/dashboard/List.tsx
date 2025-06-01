import { useEffect, useState } from "react";
import { format } from "date-fns";
import type { IPostTitle, IPost } from "../../lib/types/type";
import axiosErrorManager from "../../lib/utils/axiosError";
import api from "../../lib/utils/axios";

function List() {
    const [posts, setPosts] = useState<IPostTitle[]>([]);
    const [post, setPost] = useState<IPost | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editContent, setEditContent] = useState<string>("");

    const getPosts = async () => {
        try{
            const response = await api.get("/posts");
            if(response.data.success){
                setPosts(response.data.posts);
            }
        }catch(error){
            console.log(axiosErrorManager(error))
        }
    }

    const getPost = async (id: string) => {
        try{
            const response = await api.get(`/posts/${id}`);
            if(response.data.success){
                setPost(response.data.post);
                setSelectedPostId(id);
            }
        }catch(error){
            console.log(axiosErrorManager(error))
        }
    }

    const handleSelectPost = (id: string) => {
        if (selectedPostId === id) {
            setPost(null);
            setSelectedPostId(null);
            setIsEditing(false);
        } else {
            getPost(id);
        }
    }

    const handleClosePost = () => {
        setPost(null);
        setSelectedPostId(null);
        setIsEditing(false);
        setEditTitle("");
        setEditContent("");
    }

    const handleStartEdit = () => {
        if (post) {
            const currentPost = posts.find(p => p._id === selectedPostId);
            setEditTitle(currentPost?.title || "");
            setEditContent(post.content);
            setIsEditing(true);
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle("");
        setEditContent("");
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 25) {
            setEditTitle(value);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setEditContent(value);
        }
    };

    const updatePost = async (id: string, title: string, content: string) => {
        try{
            const response = await api.put(`/posts/${id}`, { 
                title: title.trim(), 
                content: content.trim() 
            });
            if(response.data.success){
                setIsEditing(false);
                setEditTitle("");
                setEditContent("");
                getPosts();
                getPost(id);
            }
        }catch(error){
            console.log(axiosErrorManager(error));
        }
    }

    const handleSaveEdit = () => {
        if (selectedPostId && editTitle.trim() && editContent.trim()) {
            updatePost(selectedPostId, editTitle, editContent);
        }
    }

    const deletePost = async (id: string) => {
        try{
            const response = await api.delete(`/posts/${id}`);
            if(response.data.success){
                setPost(null);
                setSelectedPostId(null);
                setIsEditing(false);
                getPosts();
            }
        }catch(error){
            console.log(axiosErrorManager(error));
        }
    }   
    
    useEffect(()=>{
        getPosts();
    },[])

    return (
        <div >
            {
                posts.length > 0 ? (
                    <ul className="space-y-5">
                        {posts.map((postItem) => (
                            <li key={postItem._id} className="border-b pb-4">
                                <h3 
                                    onClick={() => handleSelectPost(postItem._id)}
                                    className="cursor-pointer hover:text-blue-600 font-medium"
                                >
                                    {postItem.title}
                                </h3>
                                <p className="text-gray-600">Author: {postItem.author}</p>
                                <p className="text-gray-500 text-sm">
                                    Created At: {format(new Date(postItem.createdAt), "PPP 'at' p")}
                                </p>
                                
                                {selectedPostId === postItem._id && post && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        {!isEditing ? (
                                            <>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-medium">Content:</h4>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={handleStartEdit}
                                                            className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-500 rounded"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => deletePost(postItem._id)}
                                                            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-500 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button 
                                                            onClick={handleClosePost}
                                                            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-medium">Edit Post:</h4>
                                                    <button 
                                                        onClick={handleCancelEdit}
                                                        className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={editTitle}
                                                            onChange={handleTitleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Enter title..."
                                                        />
                                                        <div className="text-right text-xs text-gray-500 mt-1">
                                                            {editTitle.length}/25
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Content
                                                        </label>
                                                        <textarea
                                                            value={editContent}
                                                            onChange={handleContentChange}
                                                            rows={4}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                            placeholder="Enter content..."
                                                        />
                                                        <div className="text-right text-xs text-gray-500 mt-1">
                                                            {editContent.length}/500
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2 pt-2">
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleSaveEdit}
                                                            disabled={!editTitle.trim() || !editContent.trim()}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No posts available</p>
                )
            }
        </div>
    )
}

export default List