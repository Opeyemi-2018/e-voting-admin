"use client";
import Sidebar from "../components/sidebar";
import { useAuth } from "../context/authContext";

const AdminLayout = ({ children }) => {
  const { sidebarOpen, toggleSideBar } = useAuth();
  return (
    <section className=" mx-auto h-screen max-w-[90rem] ">
      {/* Overlay for mobile - covers full screen and closes sidebar when clicked */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/25 bg-opacity-50 z-50 lg:hidden"
          onClick={toggleSideBar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-[60] h-full w-[250px] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <Sidebar isMobile={true} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isMobile={false} />
      </div>

      {/* Main Content */}
      <div className=" xl:pl-[290px] min-h-screen lg:pl-[274px] lg:pr-6 xl:pr-10 lg:pt-[29px] md:p-6 p-4 bg-[#e1dfd3]">
        {children}
      </div>
    </section>
  );
};

export default AdminLayout;
