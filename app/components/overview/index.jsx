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
          "http://localhost:5000/api/unique-number/get-unique-number"
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
          "http://localhost:5000/api/unique-number/used-unique-number"
        );
        // setUsedNumbers(res.data.usedNumbers);
        setUsedNumber(res.data.usedNum);
        setUnUsedNumber(res.data.unUsedNum);
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
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] bg-white shadow-lg flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered Student</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
            />
          </div>
          <p className="font-semibold text-2xl"> {count}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered candidate</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
            />
          </div>
          <p className="font-semibold text-2xl">{candidateNumber.length}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
            />
          </div>
          <p className="font-semibold text-2xl">{usedNumber}</p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] min-h-[115px]  ">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Non-Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#f8f6f4] p-1 rounded-full text-[#e57226]"
            />
          </div>
          <p className="font-semibold text-2xl">{unusedNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
