"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const LiveResultsChart = () => {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate/get-candidate`,
          { withCredentials: true }
        );
        setCandidates(res.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch candidates");
      } finally {
        // setLoading(false);
      }
    };

    fetchCandidates();
  }, []);
  return (
    <div className="w-full mt-10 h-72 bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Live Voting Results
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={candidates} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votes" fill="#b72522" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveResultsChart;
