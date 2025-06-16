// controllers/auth.controller.js

import userModel from '../models/user.model.js';
import { createUser } from '../services/user.service.js';
import { validationResult } from 'express-validator';
import BlacklistTokenModel from '../models/blacklistToken.model.js'

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullname } = req.body;
    const isUserAlready = await userModel.findOne({email});
    if(isUserAlready)
    {
        return res.status(400).json({message:'user is already exist'})
    }
  const { firstname, lastname } = fullname || {};

    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
const loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user)
    {
        return res.status(401).json({message: "Invalid email or password"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
};
const getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}
const logoutUser= async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    await BlacklistTokenModel.create({token});
    res.status(200).json({message:'Logged out '})


}

export { registerUser,loginUser,getUserProfile,logoutUser };
