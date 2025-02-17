import User from "../models/User.js";
import ApiError from "../error.js";
import {HTTP_SUCCESS} from "../utils.js";


export const updateUser = async (req,res,next) => {
    if(req.params.id === req.user.id) {
       try {
            const updatedUser = await User.updateUser(req.params.id, req.body);

            HTTP_SUCCESS(res, "User has been updated", updatedUser);
       } catch (err) {
            next(err);
       }
    }else{
        return next(new ApiError(403, "You can't update other users profile"))
    }
}

export const deleteUser = async (req,res,next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.deleteUser(req.params.id);
 
             HTTP_SUCCESS(res, "User has been deleted");
        } catch (err) {
             next(err);
        }
     }else{
         return next(new ApiError(403, "You can't delete other users account"))
     }
}

export const getUser = async (req,res,next) => {
    try{
        const user = await User.findUserById(req.params.id);
        if(!user){
            return next(new ApiError(404, "User not found"))
        }
        HTTP_SUCCESS(res, "User found", user);
    }catch(err){
        next(err);
    }
}

export const subscribe = async (req,res,next) => {
    try{
        const user = await User.findUserById(req.user.id);
        const subscribedUser = await User.findUserById(req.params.id);
        if(!user || !subscribedUser){
            return next(new ApiError(404, "User not found"))
        }
        await user.subscribeToUser(subscribedUser._id);
        await subscribedUser.updateSubscriberCount(1);

        HTTP_SUCCESS(res, "User has been subscribed");

    }catch(err){
        next(err);
    }
}

export const unsubscribe = async (req,res,next) => {
    try{
        const user = await User.findUserById(req.user.id);
        const subscribedUser = await User.findUserById(req.params.id);
        if(!user || !subscribedUser){
            return next(new ApiError(404, "User not found"))
        }
        await user.unsubscribeUser(subscribedUser._id);
        await subscribedUser.updateSubscriberCount(-1);

        HTTP_SUCCESS(res, "User has been un-subscribed");

    }catch(err){
        next(err);
    }
}

export const like = async (req,res,next) => {
    try{

    }catch(err){
        next(err);
    }
}

export const dislike = async (req,res,next) => {
    try{

    }catch(err){
        next(err);
    }
}