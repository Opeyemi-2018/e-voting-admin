"use client";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
const page = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/candidate/get-candidate"
        );
        setCandidates(res.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);
  return (
    <div>
      <Navbar title={"result"} />
      <Overview />

      <div>
        {loading ? (
          <div className="spinner flex-col gap-6 flex items-center h-screen justify-center">
            <p>Please wait while your data loads</p>
            <ClipLoader color="#e57226" size={50} loading={loading} />
          </div>
        ) : !candidates ? (
          <div>no candidate</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 grid-cols-1 my-10">
            {candidates.map((candidate) => (
              <div
                className="flex items-center gap-4 p-3 rounded-md border border-[#e57226] bg-white shadow-sm hover:shadow-md transition-all duration-300"
                key={candidate._id}
              >
                <div className="w-20 h-20 overflow-hidden rounded border border-[#e57226]">
                  <img
                    src={`http://localhost:5000${candidate.image}`}
                    className="w-full h-full object-cover"
                    alt={candidate.name}
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 text-[#333]">
                  <h1 className="text-base font-semibold text-[#e57226]">
                    {candidate.name}
                  </h1>
                  <span className="text-sm font-medium">
                    Votes:{" "}
                    <span className="text-[#e57226]">{candidate.votes}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
