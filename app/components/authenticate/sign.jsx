"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowSignIn(!showSignIn)
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    router.push("/admin");
  };
  return (
    <>
      <div className=" bg-[#f8f6f4] h-screen p-3">

        
          {!showSignIn && 
          <div className="max-w-[600px] mx-auto ">
            <h1 className="text-[#443227] font-semibold text-2xl capitalize text-center mt-8 mb-5">
              sign up
            </h1>
            <form className=" bg-white p-8 flex flex-col  justify-center gap-6 rounded-md shadow-sm">
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="email"
                  className="border-gray-300 border p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Passowrd</label>
                <input
                  type="password"
                  className="border-gray-300 border p-2 rounded-md"
                />
              </div>
              <button
                onClick={handleSignUp}
                className="bg-[#e57226] uppercase text-white p-3 rounded-md w-full"
              >
                sign up
              </button>
              <div className="capitalize">already have an account <button onClick={()=> setShowSignIn(!showSignIn)} className="text-[#e57226]">sign in</button> </div>
            </form>
          </div>}
        


        
          { showSignIn &&
            <div className="max-w-[600px] mx-auto ">
            <h1 className="text-[#443227] font-semibold text-2xl capitalize text-center mt-8 mb-5">
              sign in
            </h1>
            <form className=" bg-white p-8 flex flex-col  justify-center gap-6 rounded-md shadow-sm">
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="email"
                  className="border-gray-300 border p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Passowrd</label>
                <input
                  type="password"
                  className="border-gray-300 border p-2 rounded-md"
                />
              </div>
              <button
                onClick={handleSignIn}
                className="bg-[#e57226] uppercase text-white p-3 rounded-md w-full"
              >
                sign in
              </button>
            </form>
          </div>}
        </div>
      
    </>
  );
};

export default SignIn;
