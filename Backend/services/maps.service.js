import axios from 'axios';

export const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};
export const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
   

    if (response.data.status === 'OK') {
      const element = response.data.rows[0].elements[0];

      if (element.status === 'ZERO_RESULTS') {
        throw new Error('No routes found');
      }

      // Parse and return in the expected format
      return {
        distanceInKm: element.distance.value / 1000, // meters to km
        durationInMin: element.duration.value / 60    // seconds to min
      };
    } else {
      throw new Error(`Unable to fetch distance and time: ${response.data.status}`);
    }
  } catch (err) {
    console.error('Error fetching distance & time:', err.message);
    throw err;
  }
};
 export const getAutoCompleteSuggestion = async (req, res, next) => {
  const input = req.query.input;

  if (!input) {
    return res.status(400).json({ message: "Query parameter 'input' is required" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return res.status(200).json(response.data.predictions);
    } else {
      throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
    }
  } catch (err) {
    console.error("Error fetching autocomplete suggestions:", err.message);
    return res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};
