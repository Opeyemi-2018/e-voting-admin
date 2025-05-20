"use client";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Table, Button } from "antd";
import { RiResetLeftLine } from "react-icons/ri";
import { Dropdown, Menu, message } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";

import "antd/dist/reset.css";

const page = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          "http://localhost:5000/api/candidate/get-candidate"
        );
        setCandidates(res.data);
        setFilteredCandidates(res.data); // Initially show all
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const filtered = candidates.filter((c) => c.category === category);
    setFilteredCandidates(filtered);
  };

  const handleReset = () => {
    setFilteredCandidates(candidates);
    setSelectedCategory(null);
  };

  const menu = (
    <Menu
      onClick={({ key }) => handleCategoryFilter(key)}
      items={categories.map((cat) => ({
        key: cat,
        label: cat,
      }))}
    />
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000${image}`}
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
      title: "category",
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

      <div className="my-10 ">
        {loading ? (
          <div className="spinner flex-col gap-6 flex items-center h-screen justify-center">
            <p>Please wait while your data loads</p>
            <ClipLoader color="#443227" size={50} loading={loading} />
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-6 justify-end">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button type="primary" className="flex items-center gap-2">
                  {selectedCategory ? (
                    selectedCategory
                  ) : (
                    <p>Filter by Category</p>
                  )}
                  <IoMdArrowDropdown size={20} />
                </Button>
              </Dropdown>
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
