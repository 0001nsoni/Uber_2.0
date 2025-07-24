import { createRide } from "../services/ride.service.js";
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

    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
