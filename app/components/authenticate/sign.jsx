"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ClipLoader } from "react-spinners";

import axios from "axios";

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  // console.log(formData);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("all fields are required");
      return
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/sign-up", formData);
      toast.success(res.data.msg);
      setShowSignIn(true);
      setLoading(false);
    } catch (error) {
      console.error("Sign up error:", error.response?.data); // Log full error details
      toast.error(error.response?.data?.msg || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <>
      <div className=" bg-[#f8f6f4] h-screen p-3">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          toastClassName="w-[250px] text-center"
        />
        {/* sign up */}
        {!showSignIn && (
          <div className="max-w-[600px] mx-auto ">
            <h1 className="text-[#443227] font-semibold text-2xl capitalize text-center mt-8 mb-5">
              sign up
            </h1>
            <form className=" bg-white p-8 flex flex-col  justify-center gap-6 rounded-md shadow-sm">
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-md outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label>Passowrd</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-gray-300 border p-2 rounded-md outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-5"
                >
                  {showPassword ? (
                    <MdOutlineRemoveRedEye size={30} />
                  ) : (
                    <FaRegEyeSlash size={30} />
                  )}
                </button>
              </div>

              <button
                onClick={handleSignUp}
                className="bg-[#e57226] uppercase text-white p-3 rounded-md w-full"
              >
                {loading ? (
                  <div className="spinner  flex items-center justify-center">
                    <ClipLoader color="white" size={25} loading={loading} />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="capitalize">
                already have an account{" "}
                <button
                  onClick={() => setShowSignIn(!showSignIn)}
                  className="text-[#e57226]"
                >
                  sign in
                </button>{" "}
              </div>
            </form>
          </div>
        )}

        {/* sign in  */}
        {showSignIn && (
          <div className="max-w-[600px] mx-auto ">
            <h1 className="text-[#443227] font-semibold text-2xl capitalize text-center mt-8 mb-5">
              sign in
            </h1>
            <form className=" bg-white p-8 flex flex-col  justify-center gap-6 rounded-md shadow-sm">
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="email"
                  className="border-gray-300 border p-2 rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Passowrd</label>
                <input
                  type="password"
                  className="border-gray-300 border p-2 rounded-md outline-none"
                />
              </div>
              <button
                onClick={handleSignIn}
                className="bg-[#e57226] uppercase text-white p-3 rounded-md w-full"
              >
                sign in
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SignIn;
