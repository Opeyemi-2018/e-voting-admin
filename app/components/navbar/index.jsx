import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

const Navbar = ({title}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className=" text-2xl font-semibold capitalize">{title}</p>
        <div className="lg:w-[215px] md:w-[150px]  py-[6px] px-[7px] rounded-full lg:rounded-[100px] flex justify-between bg-white items-center">
          <div className="flex justify-start items-center gap-3">
            <IoPersonCircleSharp size={30}/>
            <p className="text-[14px] font-[400] md:flex hidden  ">Admin</p>
          </div>

          <IoMdArrowDropdown size={30} className="hidden md:block  " />
        </div>

        <FiMenu size={25} className="lg:hidden block " />
      </div>
    </>
  );
};

export default Navbar;
