"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const url = process.env.NEXT_PUBLIC_MAKE_URL || "";

  const [makeValue, setMakeValue] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [isActive, setIsActive] = useState(false);

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const fetchData = async () => {
    const response = await axios.get(url);
    const responseData = await response.data;
    setData(responseData["Results"]);
  };

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    if (!makeValue.length || !modelYear.length) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [makeValue, modelYear]);

  return (
    <div className="max-w-xl h-54 p-8 grid gap-5 rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <label className="font-bold">Choose a car:</label>
          <select
            name="cars"
            id="cars"
            onChange={(event) => setMakeValue(event.target.value)}
          >
            {data &&
              data.map((item, key) => (
                <option
                  key={key}
                  value={item["MakeId"]}
                  onChange={(event) => console.log(event.currentTarget)}
                >
                  {item["MakeId"]} | {item["MakeName"]}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold">Choose a Model Year:</label>
          <select
            name="modelYear"
            id="modelYear"
            onChange={(event) => setModelYear(event.target.value)}
          >
            {years.map((item, key) => (
              <option key={key} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isActive ? (
        <Link
          href={`/result/${makeValue}/${modelYear}`}
          className="bg-cyan-400 hover:bg-cyan-500 text-white text-center font-bold p-1 w-3/12 ml-auto"
        >
          Next
        </Link>
      ) : (
        <span className="bg-gray-400 hover:bg-gray-500 text-white text-center font-bold p-1 w-3/12 ml-auto">
          Not Allowed
        </span>
      )}
    </div>
  );
}
