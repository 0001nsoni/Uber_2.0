import captainModel from '../models/captain.model.js';

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType
}) => {
  // Validate required fields
  if (
    !firstname || !email || !password ||
    !color || !plate || !capacity || !vehicleType
  ) {
    throw new Error('All fields are required');
  }

  // Create the captain
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname: lastname || ''  // handle optional lastname
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType
    }
  });

  return captain;
};
