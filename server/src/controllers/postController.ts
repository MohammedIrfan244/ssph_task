import { AuthenticatedRequest } from "../lib/types/type";
import {  Response, NextFunction } from "express";
import Post from "../models/postModel";
import CustomError from "../lib/utils/CustomError";




const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return next(new CustomError("Please provide all fields", 400));
    }
    if(content.length > 500) {
        return next(new CustomError("Content should not exceed 500 characters", 400));
    }
    if(!req.user) return next(new CustomError("You are not authenticated", 401));
    const post = new Post({
        title,
        content,
        author: req.user,
    });
    await post.save();
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
    });
}

const getPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user;
    if (!userId) return next(new CustomError("You are not authenticated", 401));
    const posts = await Post.find({ author: userId },{title: 1, author: 1, createdAt: 1})
        .populate("author", "username email")
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        posts,
    });
}

const getPostById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user;
    if (!userId) return next(new CustomError("You are not authenticated", 401));
    if (!postId) return next(new CustomError("Post ID is required", 400));
    
    const post = await Post.findById(postId).populate("author", "username email");
    
    if (!post) return next(new CustomError("Post not found", 404));
    
    return res.status(200).json({
        success: true,
        post,
    });
}

const editPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user;

    if (!userId) return next(new CustomError("You are not authenticated", 401));
    if (!postId) return next(new CustomError("Post ID is required", 400));
    if (!title || !content) {
        return next(new CustomError("Please provide all fields", 400));
    }
    
    const post = await Post.findById(postId);
    
    if (!post) return next(new CustomError("Post not found", 404));
    
    if (post.author.toString() !== userId) {
        return next(new CustomError("You are not authorized to edit this post", 403));
    }
    if (content.length > 500) {
        return next(new CustomError("Content should not exceed 500 characters", 400));
    }
    
    post.title = title;
    post.content = content;
    
    await post.save();
    
    return res.status(200).json({
        success: true,
        message: "Post updated successfully",
    });
}

const deletePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user;

    if (!userId) return next(new CustomError("You are not authenticated", 401));
    if (!postId) return next(new CustomError("Post ID is required", 400));
    
    const post = await Post.findById(postId);
    
    if (!post) return next(new CustomError("Post not found", 404));
    
    if (post.author.toString() !== userId) {
        return next(new CustomError("You are not authorized to delete this post", 403));
    }
    
    await Post.deleteOne({ _id: postId });
    
    return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
}

export { createPost, getPosts, getPostById, editPost, deletePost };