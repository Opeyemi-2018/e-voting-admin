"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal, Spin, Select } from "antd";
import { RiDeleteBinLine, RiResetLeftLine } from "react-icons/ri";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import GetUniqueNumber from "@/app/components/getUniqueNumber";

const { Option } = Select;

const ManageVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

 
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          "https://e-voting-server-bxpt.onrender.com/api/candidate/get-candidate"
        );
        setCandidates(res.data);
        setFilteredCandidates(res.data); 
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCandidate) return;
    setConfirmLoading(true);
    try {
      await axios.delete(
        `https://e-voting-server-bxpt.onrender.com/api/candidate/delete-candidate/${selectedCandidate._id}`
      );
      const updated = candidates.filter(
        (candidate) => candidate._id !== selectedCandidate._id
      );
      setCandidates(updated);
      setFilteredCandidates(
        categoryFilter
          ? updated.filter((c) => c.category === categoryFilter)
          : updated
      );
      toast.success("Candidate deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete candidate");
    } finally {
      setConfirmLoading(false);
      setIsModalOpen(false);
      setSelectedCandidate(null);
    }
  };

  // Handle filter by category
  const handleFilterChange = (value) => {
    setCategoryFilter(value);
    if (value) {
      setFilteredCandidates(candidates.filter((c) => c.category === value));
    } else {
      setFilteredCandidates(candidates);
    }
  };

  // Reset filter
  const handleReset = () => {
    setCategoryFilter("");
    setFilteredCandidates(candidates);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteClick(record)}
          icon={<RiDeleteBinLine size={18} />}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Navbar title="Manage Vote" />
      <Overview />
      <ToastContainer />

      <div className="py-6 mt-8">
        <div className="flex flex-col md:gap-2 gap-4">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold capitalize">Candidates</h2>
              <div className="flex gap-4 items-center">
                <Select
                  placeholder="Filter by category"
                  value={categoryFilter || undefined}
                  onChange={handleFilterChange}
                  style={{ width: 180 }}
                  allowClear
                >
                  <Option value="President">President</Option>
                  <Option value="Vice President">Vice President</Option>
                  <Option value="General Secretary">General Secretary</Option>
                  <Option value="Assistant General Secretary">
                    Assistant General Secretary
                  </Option>
                  <Option value="PRO">PRO</Option>
                </Select>
                <Button
                  type="default"
                  icon={<RiResetLeftLine />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Spin size="large" className="custom-spinner" />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={filteredCandidates}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
              />
            )}
          </div>

          <GetUniqueNumber />
        </div>
      </div>

      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleDeleteConfirm}
        confirmLoading={confirmLoading}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          style: { backgroundColor: "#e57226", borderColor: "#e57226" },
        }}
      >
        <p>Are you sure you want to delete this candidate?</p>
      </Modal>
    </div>
  );
};

export default ManageVote;
