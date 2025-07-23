import { validationResult } from "express-validator";
import { getAddressCoordinate, getAutoCompleteSuggestion } from "../services/maps.service.js";
import { getDistanceTime } from "../services/maps.service.js";

export const getCoordinates = async (req, res, next) => {
const error=validationResult(req);
if(!error.isEmpty())
{
    return res.status(400).json({errors: errors.array()});
}
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: "Address query parameter is required" });
  }

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error in getCoordinates:", error.message);
    res.status(404).json({ message: "Coordinates not found" });
  }
};
export const getDistTime=async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) // 
        {
            return res.status(400).json({errors:errors.array()});
        }
        const {origin,destination}=req.query;
        const distanceTime=await getDistanceTime(origin,destination);
        res.status(200).json(distanceTime);
    }catch(err)
    {
        console.error(err);
        res.status(500).json({message:'Internal server error'});
    }
    
}
export const getAutoComplete=async(req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        const {input} = req.query;
        const suggestions = await getAutoCompleteSuggestion(input);
        res.status(200).json(suggestions);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}