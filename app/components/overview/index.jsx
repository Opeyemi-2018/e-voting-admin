"use client"
import axios from "axios";
import {useState, useEffect } from "react";
import { IoPeopleOutline } from "react-icons/io5";

const Overview = () => {

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/unique-number/get-unique-number");
          setCount(response.data.count);
        } catch (error) {
          console.error("Error fetching count:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, []);
  
  return (
    <div className="flex items-center gap-4 overflow-auto mt-6">
      <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] bg-white shadow-lg flex flex-col justify-between gap-[10px] min-h-[115px]  ">
        <div className="flex items-center text-[#443227] justify-between">
          <p className="text-wrap">Total Registered Student</p>
          <IoPeopleOutline
            size={25}
            className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
          />
        </div>
        <p className="font-semibold text-2xl"> {count.toLocaleString()}</p>
      </div>
      <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
        <div className="flex items-center text-[#443227] justify-between">
          <p>Total vote</p>
          <IoPeopleOutline
            size={25}
            className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
          />
        </div>
        <p className="font-semibold text-2xl">100</p>
      </div>
      <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
        <div className="flex items-center text-[#443227] justify-between">
          <p>Total Voters</p>
          <IoPeopleOutline
            size={25}
            className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
          />
        </div>
        <p className="font-semibold text-2xl">100</p>
      </div>
      <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
        <div className="flex items-center text-[#443227] justify-between">
          <p className="text-wrap">Total Non-Voters</p>
          <IoPeopleOutline
            size={25}
            className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
          />
        </div>
        <p className="font-semibold text-2xl">100</p>
      </div>
    </div>
  );
};

export default Overview;
