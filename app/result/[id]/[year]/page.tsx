import { Suspense } from "react";
import VehicleData from "../../../../components/vehicleData";

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
