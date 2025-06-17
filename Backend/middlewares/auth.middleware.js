import userModel from "../models/user.model.js";
import BlacklistTokenModel from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";

const authUser = async (req, res, next) => {
    try {
        let token;

        // Try to get token from cookie first, then from Authorization header
        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }
        const isBlacklisted = await BlacklistTokenModel.findOne({token:token});
        if(isBlacklisted)
        {
            return res.status(401).json({message:'Unauthorized access'});
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access", error: err.message });
    }
};
const authCaptain = async(req,res,next)=>{
 try {
        let token;

        // Try to get token from cookie first, then from Authorization header
        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }
        const isBlacklisted = await BlacklistTokenModel.findOne({token:token});
        if(isBlacklisted)
        {
            return res.status(401).json({message:'Unauthorized access'});
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        req.captain = captain;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access", error: err.message });
    }
};

export {authUser,authCaptain};
