"use client";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/app/context/authContext";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";


const Navbar = ({ title }) => {
  const { user, toggleSideBar, sidebarOpen } = useAuth();
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className=" text-2xl font-semibold capitalize">{title}</p>

        <div className="flex bg-white justify-between items-center lg:w-[160px] md:w-[150px]  py-[6px] px-[8px] rounded-full lg:rounded-[100px]">
          <IoPersonCircleSharp size={30} />
          <p className="text-[14px] font-[400] md:flex hidden  ">
            {user && user.user && user.user.email
              ? user.user.email
              : "Loading..."}
          </p>
        </div>

        <button className="lg:hidden block" onClick={toggleSideBar}>
          {sidebarOpen ? <LiaTimesSolid size={30} /> : <FiMenu size={30} />}
        </button>
      </div>
    </>
  );
};

export default Navbar;
