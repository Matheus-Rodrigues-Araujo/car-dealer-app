import axios from "axios";
import { Suspense } from "react";

export async function generateStaticParams() {
  const vehicles = [
    { id: "1", year: "2020" },
    { id: "2", year: "2021" },
    { id: "3", year: "2022" },
  ];

  return vehicles.map((vehicle) => ({
    id: vehicle.id,
    year: vehicle.year,
  }));
}

const fetchVehicleData = async (id: string, year: string) => {
  const url = `${process.env.NEXT_PUBLIC_VEHICLE_URL}/makeId/${id}/modelyear/${year}?format=json`;
  try {
    const response = await axios.get(url);
    return response.data.Results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const VehicleData = async ({ id, year }: { id: string; year: string }) => {
  const vehicleData = await fetchVehicleData(id, year);

  return (
    <div className="flex flex-wrap gap-2">
      {vehicleData &&
        vehicleData.map((item:any) => (
          <div key={item["MAKE_ID"]} className="w-64 border-2 p-2">
            <div>
              <p>MAKE_ID: {item["Make_ID"]}</p>
              <p>MAKE_NAME: {item["Make_Name"]}</p>
              <p>MODEL_ID: {item["Model_ID"]}</p>
              <p>MODEL_NAME: {item["Model_Name"]}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

const VehiclePage = ({ params }: { params: { id: string; year: string } }) => {
  const { id, year } = params;

  return (
    <div className="p-8 grid gap-5 rounded-lg bg-white">
      <h1 className="text-xl font-bold">Vehicle Data</h1>
      <h2 className="text-lg font-medium">
        ID: {id} | YEAR: {year}
      </h2>
      
      <Suspense fallback={<div>Loading vehicle data...</div>}>
        <VehicleData id={id} year={year} />
      </Suspense>
    </div>
  );
};

export default VehiclePage;
