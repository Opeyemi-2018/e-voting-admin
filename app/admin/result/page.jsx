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
                className="flex items-center gap-6 border rounded-md border-[#e57226]"
                key={candidate._id}
              >
                <div className="w-52 h-52 overflow-hidden rounded-sm">
                  {" "}
                  {/* Container for fixed size */}
                  <img
                    src={`http://localhost:5000${candidate.image}`}
                    className="w-full h-full object-cover"
                    alt={candidate.name}
                  />
                </div>
                <div className="flex items-center flex-col gap-3 text-3xl font-semibold pr-4">
                  <h1>{candidate.name}</h1>
                  <h1 className="">{candidate.votes}</h1>
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
