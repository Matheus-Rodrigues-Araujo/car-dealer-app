import { Vehicle } from "../../models/interfaces/vehicle.interface";
import { fetchVehicleData } from "../../lib/api";

const VehicleData = async ({ id, year }: { id: string; year: string }) => {
    const vehicleData = await fetchVehicleData(id, year);
  
    return (
      <div className="flex flex-wrap gap-2">
        {vehicleData &&
          vehicleData.map((item: Vehicle) => (
            <div key={item["MAKE_ID"]} className="w-64 border-2 p-2">
              <div>
                <p>MAKE_ID: {item.MAKE_ID}</p>
                <p>MAKE_NAME: {item.MAKE_NAME}</p>
                <p>MODEL_ID: {item.MODEL_ID}</p>
                <p>MODEL_NAME: {item.MODEL_NAME}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

export default VehicleData