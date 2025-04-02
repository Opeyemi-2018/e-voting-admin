"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, Spin } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const GetUniqueNumber = () => {
  const [loading, setLoading] = useState(true);
  const [uniqueNumbers, setUniqueNumbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Fetching unique numbers
  useEffect(() => {
    const fetchUniqueNumbers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/unique-number/get-unique-number"
        );
        setUniqueNumbers(response.data.uniqueNumbers);
      } catch (err) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUniqueNumbers();
  }, []);

  // Handle the delete confirmation modal
  const confirmDelete = (id) => {
    setSelectedNumber(id);
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDeleteConfirm = async () => {
    if (!selectedNumber) return;

    setConfirmLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/unique-number/delete-unique-number/${selectedNumber}`
      );
      setUniqueNumbers((prev) =>
        prev.filter((num) => num._id !== selectedNumber)
      );
      toast.success("Successfully deleted");
    } catch (err) {
      toast.error("Failed to delete number");
    } finally {
      setConfirmLoading(false);
      setIsModalOpen(false);
      setSelectedNumber(null);
    }
  };

  // Ant Design Table Columns
  const columns = [
    {
      title: "Voter ID",
      dataIndex: "uniqueNumber",
      key: "uniqueNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ backgroundColor: "red", borderColor: "red", color: "white" }}
          type="button"
          danger
          icon={<RiDeleteBinLine />}
          onClick={() => confirmDelete(record._id)}
        />
      ),
    },
  ];

  return (
    <div className="max-w-[300px]">
      <ToastContainer />

      <div className="w-full">
        <h2 className="text-[22px] font-semibold capitalize mb-4">
          Verified Voters ID
        </h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spin size="large" className="custom-spinner" />
            </div>
          ) : uniqueNumbers.length > 0 ? (
            <Table
              columns={columns}
              dataSource={uniqueNumbers}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <p>No unique numbers found.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
        <p>Are you sure you want to delete this unique number?</p>
      </Modal>
    </div>
  );
};

export default GetUniqueNumber;
