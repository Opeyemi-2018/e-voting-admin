"use client";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Table, Button } from "antd"; 
import { RiResetLeftLine } from "react-icons/ri";
import "antd/dist/reset.css";
const page = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "President",
    "Vice President",
    "General Secretary",
    "Assistant General Secretary",
    "PRO",
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate/get-candidate`,
          { withCredentials: true }
        );
        setCandidates(res.data);
        setFilteredCandidates(res.data);
      } catch (error) {
        console.error(
          "Failed to fetch candidates:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter((c) => c.category === category);
      setFilteredCandidates(filtered);
    }
  };

  const handleReset = () => {
    setFilteredCandidates(candidates);
    setSelectedCategory("");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="candidate"
          className="rounded-full w-10 h-10 object-cover border border-[#443227]"
        />
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span className="text-[#443227] font-semibold">{name}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="text-[#443227] font-semibold">{category}</span>
      ),
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
      render: (votes) => (
        <span className="text-[#443227] font-semibold">{votes}</span>
      ),
    },
  ];

  return (
    <div>
      <Navbar title={"result"} />
      <Overview />

      <div className="my-10">
        {loading ? (
          <div className="spinner flex-col gap-6 flex items-center h-screen justify-center">
            <p>Please wait while your data loads</p>
            <ClipLoader color="#443227" size={50} loading={loading} />
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-6 justify-end">
              {/* Custom Select for Filtering */}
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#443227] focus:border-transparent text-[#443227]"
              >
                <option value="">Filter Results</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Ant Design Button for Reset (or you can use a normal HTML button) */}
              <Button
                type="default"
                icon={<RiResetLeftLine />}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

            <Table
              dataSource={filteredCandidates}
              columns={columns}
              rowKey="_id"
              pagination={false}
              bordered
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
