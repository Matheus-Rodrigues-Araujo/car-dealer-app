"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const Result = ({ params }: { params: { id: string; year: string } }) => {
  const { id, year } = params;
  const [vehicle, setVehicle] = useState([]);

  const url = `${process.env.NEXT_PUBLIC_VEHICLE_URL}/makeId/${id}/modelyear/${year}?format=json`;

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(url);
      const responseData = await response.data;
      setVehicle(responseData["Results"]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  });

  return (
    <div className="p-8 grid gap-5 rounded-lg bg-white">
      <h1 className="text-xl font-bold">Vechicle Data</h1>
      <h2 className="text-lg font-medium">
        ID: {id} | YEAR: {year}
      </h2>
      <div className="flex flex-wrap gap-2">
        {vehicle &&
          vehicle.map((item, key) => (
            <div key={key} className="w-64 border border-1 p-2">
              <div>
                <p>MAKE_ID: {item["Make_Name"]}</p>
                <p>MAKE_NAME: {item["Make_Name"]}</p>
                <p>MODEL_ID: {item["Model_ID"]}</p>
                <p>MODEL_NAME: {item["Model_Name"]}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Result;
