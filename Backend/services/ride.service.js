import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);
  const distanceInKm = distanceTime.distanceInKm;
  const durationInMin = distanceTime.durationInMin;

  // Add validation to prevent NaN fares
  if (
    typeof distanceInKm !== "number" ||
    isNaN(distanceInKm) ||
    typeof durationInMin !== "number" ||
    isNaN(durationInMin)
  ) {
    throw new Error("Could not calculate distance or duration. Please check your addresses.");
  }

  const rates = {
    auto: { baseFare: 30, perKmRate: 10, perMinRate: 1.5, minFare: 50 },
    car: { baseFare: 50, perKmRate: 12, perMinRate: 2, minFare: 80 },
    motorcycle: { baseFare: 20, perKmRate: 8, perMinRate: 1, minFare: 40 },
  };

  const calculateFare = (rate) => {
    let totalFare =
      rate.baseFare +
      distanceInKm * rate.perKmRate +
      durationInMin * rate.perMinRate;
    if (totalFare < rate.minFare) totalFare = rate.minFare;
    return Math.round(totalFare * 100) / 100;
  };

  return {
    auto: calculateFare(rates.auto),
    car: calculateFare(rates.car),
    motorcycle: calculateFare(rates.motorcycle),
  };
}
export const createRide = async({user,pickup,destination,vehicleType})=>{
    if(!user||!pickup||!destination||!vehicleType)
    {
        throw new Error("All fields are required");
    }
    const fare = await getFare(pickup,destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare:fare[vehicleType]
    }) 
    return ride;

}