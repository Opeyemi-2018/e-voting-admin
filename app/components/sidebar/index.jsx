"use client";
import { MdHowToVote } from "react-icons/md";

import { usePathname, useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    { id: 1, name: "overview", icon: <LuLayoutDashboard />, path: "/admin" },
    {
      id: 2,
      name: "create-vote",
      icon: <MdOutlineCreateNewFolder />,
      path: "/admin/create-vote",
    },
    {
      id: 3,
      name: "manage-candidate",
      icon: <MdManageHistory />,
      path: "/admin/manage-candidate",
    },
    {
      id: 4,
      name: "result",
      icon: <MdOutlineFormatListNumberedRtl />,
      path: "/admin/result",
    },
    { id: 5, name: "setting", icon: <CiSettings />, path: "/admin/setting" },
  ];
  return (
    <div className=" h-screen w-[250px] max-w-[250px]  min-h-full fixed top-0 bg-[#e57226] ">
      <div className="flex items-center justify-center gap-8 flex-col">
        <div className="flex items-center gap-3 mt-12">
          <MdHowToVote size={30} color="white" />
          <h1 className="text-white font-bold text-2xl">E-Voting</h1>
        </div>
        <span className="h-1 bg-[#443227] w-full"></span>
        <ul className="space-y-4">
          {routes.map((route) => (
            <li
              key={route.id}
              onClick={() => router.push(route.path)}
              className={`${
                pathName === route.path
                  ? "bg-white text-[#443227]"
                  : "text-white bg-transparent"
              } flex gap-3 items-center capitalize cursor-pointer hover:bg-[#443227] hover:text-white px-4 p-2 rounded-md transition-all duration-300 delay-150`}
            >
              <span className="text-2xl">{route.icon}</span> {route.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
