import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaEdit, FaTrash, FaTimes, FaUser, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
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
        try {
            const response = await api.get("/posts");
            if (response.data.success) {
                setPosts(response.data.posts);
            }
        } catch (error) {
            console.log(axiosErrorManager(error))
        }
    }

    const getPost = async (id: string) => {
        try {
            const response = await api.get(`/posts/${id}`);
            if (response.data.success) {
                setPost(response.data.post);
                setSelectedPostId(id);
            }
        } catch (error) {
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
        try {
            const response = await api.put(`/posts/${id}`, {
                title: title.trim(),
                content: content.trim()
            });
            if (response.data.success) {
                setIsEditing(false);
                setEditTitle("");
                setEditContent("");
                getPosts();
                getPost(id);
            }
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    }

    const handleSaveEdit = () => {
        if (selectedPostId && editTitle.trim() && editContent.trim()) {
            updatePost(selectedPostId, editTitle, editContent);
        }
    }

    const deletePost = async (id: string) => {
        try {
            const response = await api.delete(`/posts/${id}`);
            if (response.data.success) {
                setPost(null);
                setSelectedPostId(null);
                setIsEditing(false);
                getPosts();
            }
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-4">
            {posts.length > 0 ? (
                <div className="space-y-6">
                    {posts.map((postItem) => (
                        <div key={postItem._id} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-200 hover:shadow-2xl">

                            <div className="p-6 border-b border-gray-100">
                                <h3
                                    onClick={() => handleSelectPost(postItem._id)}
                                    className="cursor-pointer text-xl font-bold text-gray-800 hover:text-green-500 transition-colors duration-200 mb-3"
                                >
                                    {postItem.title}
                                </h3>

                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-green-400" />
                                        <span className="font-medium">{postItem.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-green-400" />
                                        <span>{format(new Date(postItem.createdAt), "PPP 'at' p")}</span>
                                    </div>
                                </div>
                            </div>


                            {selectedPostId === postItem._id && post && (
                                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                                    {!isEditing ? (
                                        <>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <FaFileAlt className="text-green-400" />
                                                    <h4 className="font-semibold text-gray-800">Content</h4>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleStartEdit}
                                                        className="flex items-center gap-2 text-green-500 hover:text-green-600 text-sm px-3 py-2 border border-green-300 rounded-lg hover:bg-green-50 transition-all duration-200 font-medium"
                                                    >
                                                        <FaEdit size={14} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deletePost(postItem._id)}
                                                        className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm px-3 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
                                                    >
                                                        <FaTrash size={14} />
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={handleClosePost}
                                                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                    >
                                                        <FaTimes size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center mb-6">
                                                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                                    <FaEdit className="text-green-400" />
                                                    Edit Post
                                                </h4>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                >
                                                    <FaTimes size={16} />
                                                </button>
                                            </div>

                                            <div className="space-y-5">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={handleTitleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                                                        placeholder="Enter title..."
                                                    />
                                                    <div className="text-right text-xs text-gray-500 mt-1 font-medium">
                                                        {editTitle.length}/25
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Content
                                                    </label>
                                                    <textarea
                                                        value={editContent}
                                                        onChange={handleContentChange}
                                                        rows={6}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none transition-colors text-gray-700 placeholder-gray-400"
                                                        placeholder="Enter content..."
                                                    />
                                                    <div className="text-right text-xs text-gray-500 mt-1 font-medium">
                                                        {editContent.length}/500
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        disabled={!editTitle.trim() || !editContent.trim()}
                                                        className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                        <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Available</h3>
                        <p className="text-gray-500">Create your first post to get started!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default List