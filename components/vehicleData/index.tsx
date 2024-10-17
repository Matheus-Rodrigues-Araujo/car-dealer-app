import { Vehicle } from "../../models/interfaces/vehicle.interface";
import { fetchVehicleData } from "../../lib/api";

const VehicleData = async ({ id, year }: { id: string; year: string }) => {
    const vehicleData = await fetchVehicleData(id, year);

    return (
      <div className="flex flex-wrap gap-2">
        {vehicleData &&
          vehicleData.map((item: Vehicle) => (
            <div key={item.Make_ID} className="w-64 border-2 p-2">
              <div>
                <p>MAKE_ID: {item.Make_ID}</p>
                <p>MAKE_NAME: {item.Make_Name}</p>
                <p>MODEL_ID: {item.Model_ID}</p>
                <p>MODEL_NAME: {item.Model_Name}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

export default VehicleData