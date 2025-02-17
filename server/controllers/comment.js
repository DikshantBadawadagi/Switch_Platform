import Comment from "../models/Comments.js";
import Video from "../models/Video.js";
import { HTTP_SUCCESS } from "../utils.js";
import ApiError from "../error.js";

export const addComment = async (req,res,next) => {
    const newComment = new Comment({...req.body, userId: req.user.id});
    try{
        const savedComment = await newComment.save();
        if(!savedComment) {
            throw new ApiError(500, "Something went wrong while adding comment")
        }
        HTTP_SUCCESS(res, "Comment has been created", savedComment);

    }catch(err){
        next(err);
    }
}

export const deleteComment = async (req,res,next) => {
    try{
        const comment = await Comment.findCommentById(req.params.id);
        const video = await Video.findVideoById(req.params.id);
        if(!comment) {
            throw new ApiError(404, "Comment not found");
        }
        if(comment.userId === req.user.id || video.userId === req.user.id){
            await Comment.deleteComment(comment.id)
            HTTP_SUCCESS(res, "Comment has been deleted");
        }else{
            throw new ApiError(403, "You are not authorized to delete this comment");
        }
    }catch(err){
        next(err);
    }
}

export const getComment = async (req,res,next) => {
    try{
        const comments = await Comment.getCommentsWithPagination(req.params.videoId, 1, 10);
        if(!comments) {
            throw new ApiError(404, "Comments not found");
        }
        HTTP_SUCCESS(res, "Comments have been retrieved", comments);
    }catch(err){
        next(err); 
    }
}