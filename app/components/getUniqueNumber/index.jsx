"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";

const GetAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student-auth/students");
        setStudents(res.data.students);
      } catch (error) {
        toast.error("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Matric Number",
      dataIndex: "matricNumber",
      key: "matricNumber",
    },
  ];

  return (
    <div className="max-w-3xl">
      <ToastContainer />
      <h2 className="text-[22px] font-semibold capitalize mb-4">
        Registered Students
      </h2>

      <div className="bg-white p-6 rounded-md shadow-md">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : students.length > 0 ? (
          <Table
            columns={columns}
            dataSource={students}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllStudents;
