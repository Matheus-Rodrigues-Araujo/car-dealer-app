import axios from "axios";

export const fetchVehicleData = async (id: string, year: string) => {
  const url = `${process.env.NEXT_PUBLIC_VEHICLE_URL}/makeId/${id}/modelyear/${year}?format=json`;
  try {
    const response = await axios.get(url);
    return response.data.Results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
