"use client";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/reset.css"; 

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
          <Table
            dataSource={candidates}
            columns={columns}
            rowKey="_id"
            pagination={false}
            bordered
          />
        )}
      </div>
    </div>
  );
};

export default page;
