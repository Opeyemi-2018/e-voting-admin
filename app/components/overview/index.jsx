"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

const Overview = () => {
  const [count, setCount] = useState(0);
  const [usedNumber, setUsedNumber] = useState(0);
  const [unusedNumber, setUnUsedNumber] = useState(0);
  const [candidateNumber, setcandidateNumber] = useState([]);
  const [loadingCount, setLoadingCount] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadingVoters, setLoadingVoters] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student-auth/students`
        );
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching count:", error);
      } finally {
        setLoadingCount(false);
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate/get-candidate`
        );
        setcandidateNumber(res.data);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoadingCandidates(false);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchUsedNumbers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student-auth/voted-students`,
          { withCredentials: true }
        );
        setUsedNumber(res.data.votedCount);
        setUnUsedNumber(res.data.votedNonCount);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoadingVoters(false);
      }
    };
    fetchUsedNumbers();
  }, []);

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "24px", // To match the height of the text
  };

  return (
    <div>
      <div className="flex items-center gap-4 overflow-auto mt-6">
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] bg-white shadow-lg flex flex-col justify-between gap-[10px] h-[140px]">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered Student</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">
            {loadingCount ? (
              <div style={loaderStyle}>
                <ClipLoader size={20} color="#b72522" />
              </div>
            ) : (
              count
            )}
          </p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Registered Candidate</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">
            {loadingCandidates ? (
              <div style={loaderStyle}>
                <ClipLoader size={20} color="#b72522" />
              </div>
            ) : (
              candidateNumber.length
            )}
          </p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]">
          <div className="flex items-center text-[#443227] justify-between">
            <p>Total Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">
            {loadingVoters ? (
              <div style={loaderStyle}>
                <ClipLoader size={20} color="#b72522" />
              </div>
            ) : (
              usedNumber
            )}
          </p>
        </div>
        <div className="w-full text-nowrap min-w-[188px] p-4 rounded-[10px] shadow-lg bg-white flex flex-col justify-between gap-[10px] h-[140px]">
          <div className="flex items-center text-[#443227] justify-between">
            <p className="text-wrap">Total Non-Voters</p>
            <IoPeopleOutline
              size={25}
              className="bg-[#e1dfd3] p-1 rounded-full text-[#b72522]"
            />
          </div>
          <p className="font-semibold text-2xl">
            {loadingVoters ? (
              <div style={loaderStyle}>
                <ClipLoader size={20} color="#b72522" />
              </div>
            ) : (
              unusedNumber
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
