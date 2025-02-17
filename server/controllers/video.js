import Video from "../models/Video.js";
import User from "../models/User.js";
import ApiError from "../error.js";
import {HTTP_SUCCESS} from "../utils.js";

export const addVideo = async (req,res,next) => {
    const newVideo = new Video({userId : req.user.id, ...req.body});
    try {
        const savedVideo = newVideo.save();
        if(!savedVideo) {
            throw new ApiError(500, "Something went wrong")
        }
        HTTP_SUCCESS(res, "Video has been created", savedVideo);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req,res,next) => {
    try {
        const video = await Video.findVideoById(req.params.id);
        if(!video) {
            throw new ApiError(404, "Video not found");
        }
        if(req.user.id === video.userId) {
            const updatedVideo = await Video.updateVideo(req.params.id, req.body);
            HTTP_SUCCESS(res, "Video has been updated", updatedVideo);
        }else{
            throw new ApiError(403, "You are not authorized to update this video");
        }
        
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req,res,next) => {
    try {
        const video = await Video.findVideoById(req.params.id);
        if(!video) {
            throw new ApiError(404, "Video not found");
        }
        if(req.user.id === video.userId) {
            await Video.deleteVideo(req.params.id);
            HTTP_SUCCESS(res, "Video has been updated", updatedVideo);
        }else{
            throw new ApiError(403, "You are not authorized to delete this video");
        }
        
    } catch (err) {
        next(err);
    }
}

export const getVideo = async (req,res,next) => {
    try {
        const video = await Video.findVideoById(req.params.id);
        if(!video) {
            throw new ApiError(404, "Video not found");
        }
        HTTP_SUCCESS(res, "Video found", video);
        
    } catch (err) {
        next(err);
    }
}

export const addView = async (req,res,next) => {
    try {
        const video = await Video.findVideoById(req.params.id);
        if(!video) {
            throw new ApiError(404, "Video not found");
        }
        video.incrementViews();
        HTTP_SUCCESS(res, "Video views have been incremented", video);
        
    } catch (err) {
        next(err);
    }
}

export const random = async (req,res,next) => {
    try {
        const videos = await Video.getRandomVideos(40);
        if(!videos) {
            throw new ApiError(404, "Video not found");
        }
        HTTP_SUCCESS(res, "Random Videos found", videos);
        
    } catch (err) {
        next(err);
    }
}

export const trend = async (req,res,next) => {
    try {
        const video = await Video.getTrendingVideos();
        if(!video) {
            throw new ApiError(404, "Video not found");
        }
        HTTP_SUCCESS(res, "Trending Videos", video);
        
    } catch (err) {
        next(err);
    }
}

export const sub = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            throw new ApiError(404, "Something went wrong while fetching user");
        }
    const videos = await user.getSubscribedVideos(Video);
        if(!videos) {
            throw new ApiError(404, "Error fetching videos");
        }
        HTTP_SUCCESS(res, "Videos  found", videos);
        
    } catch (err) {
        next(err);
    }
}

export const getByTag = async (req,res,next) => {
    try {
    const videos = await Video.searchVideos(req.query.tags.split(",")).limit(20);
        if(!videos) {
            throw new ApiError(404, "Error fetching videos");
        }
        HTTP_SUCCESS(res, "Videos  found", videos);
        
    } catch (err) {
        next(err);
    }
}

export const search = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            throw new ApiError(404, "Something went wrong while fetching user");
        }
    const videos = await user.getSubscribedVideos(Video);
        if(!videos) {
            throw new ApiError(404, "Error fetching videos");
        }
        HTTP_SUCCESS(res, "Videos  found", videos);
        
    } catch (err) {
        next(err);
    }
}