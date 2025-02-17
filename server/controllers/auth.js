import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../error.js";
import jwt from "jsonwebtoken";
import { HTTP_SUCCESS, HTTP_CREATED, HTTP_NO_CONTENT } from "../utils.js";

export const signup = async (req, res, next) => {
    console.log(req.body);
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body,password:hash});
        await newUser.save();
        if(!newUser) {
            throw new ApiError(500, "Something went wrong")
        }
        HTTP_SUCCESS(res, "User has been created");
        }catch(err){
        return next(err);
    }
};

export const signin = async (req, res, next) => {
    console.log(req.body);
    
    try{
        const user = await User.findOneUser({name:req.body.name});
        if(!user) {
            throw new ApiError(404, "User not found")
        } 
        
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) {
            throw new ApiError(400, "Wrong username or password")
        }

        const token = jwt.sign({id: user._id}, process.env.JWT)

        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);


    }catch(err){
        return next(err);    
    }
};