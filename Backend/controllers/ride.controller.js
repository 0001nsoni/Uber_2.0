import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/maps.service.js";
import { createRide, getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRides = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // ✅ Send response immediately
    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });

    // ✅ Do async work without affecting response
    (async () => {
      try {
        const pickupCoordinates = await getAddressCoordinate(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(
          pickupCoordinates.lat, // FIX typo
          pickupCoordinates.lng,
          2
        );
        console.log("captainsInRadius:", captainsInRadius);
      } catch (bgErr) {
        console.error("Background task error:", bgErr.message);
      }
    })();

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getFaree = async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {pickup,destination}=req.query;
  try{
    const fare=await getFare(pickup,destination);
    return res.status(200).json(fare);
  }
  catch(err)
  {
    return res.status(500).json({message:err.message});
  }
}