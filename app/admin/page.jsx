import React from "react";
import Navbar from "../components/navbar";
import { IoPeopleOutline } from "react-icons/io5";

const page = () => {
  return (
    <div>
      <Navbar title="Overview" />

      <div className="flex items-center gap-4 overflow-auto mt-6">
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] bg-white shadow-lg flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Registered Student</p>
            <IoPeopleOutline size={25} className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"/>
          </div>
          <p className="font-semibold text-2xl">100</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total  vote</p>
            <IoPeopleOutline size={25} className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"/>
          </div>
          <p className="font-semibold text-2xl">100</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Voters</p>
            <IoPeopleOutline size={25} className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"/>
          </div>
          <p className="font-semibold text-2xl">100</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Non-Voters</p>
            <IoPeopleOutline size={25} className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"/>
          </div>
          <p className="font-semibold text-2xl">100</p>
        </div>
        
      </div>
    </div>
  );
};

export default page;
