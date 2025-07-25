"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoPeopleOutline } from "react-icons/io5";

const Overview = () => {
  const [count, setCount] = useState(0);
  const [usedNumber, setUsedNumber] = useState(0);
  const [unusedNumber, setUnUsedNumber] = useState(0);
  const [candidateNumber, setcandidateNumber] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          // "https://e-voting-server-bxpt.onrender.com/api/unique-number/get-unique-number"
          "http://localhost:5000/api/student-auth/students"
        );
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          // "https://e-voting-server-bxpt.onrender.com/api/candidate/get-candidate"
          "http://localhost:5000/api/candidate/get-candidate"
        );
        setcandidateNumber(res.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // used number
  useEffect(() => {
    const fetchUsedNumbers = async () => {
      try {
        const res = await axios.get(
          // "https://e-voting-server-bxpt.onrender.com/api/unique-number/used-unique-number"
          "http://localhost:5000/api/student-auth/voted-students"
        );
        // setUsedNumbers(res.data.usedNumbers);
        setUsedNumber(res.data.votedCount);
        setUnUsedNumber(res.data.votedNonCount);
      } catch (err) {
        console.error(err);
        setError("Failed to load used numbers");
      } finally {
        setLoading(false);
      }
    };

    fetchUsedNumbers();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4 overflow-auto mt-6">
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] bg-white shadow-lg flex flex-col justify-between gap-[10px] h-[140px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered Student</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl"> {count}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered candidate</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">{candidateNumber.length}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">{usedNumber}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Non-Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">{unusedNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
