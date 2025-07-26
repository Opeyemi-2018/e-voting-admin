"use client";
import Sidebar from "../components/sidebar";
import { useAuth } from "../context/authContext";

const AdminLayout = ({ children }) => {
  const { sidebarOpen, toggleSideBar } = useAuth();
  return (
    <section className=" mx-auto h-screen max-w-[90rem] ">
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[250px] bg-white transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div
          className="fixed  lg:hidden"
          onClick={toggleSideBar}
        ></div>
      )}

      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className=" xl:pl-[290px] min-h-screen lg:pl-[274px] lg:pr-6 xl:pr-10 lg:pt-[29px] md:p-6 p-4 bg-[#e1dfd3]">
        {children}
      </div>
    </section>
  );
};

export default AdminLayout;
