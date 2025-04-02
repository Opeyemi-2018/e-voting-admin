"use client";
import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) {
      toast.error("Name and category are required.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/candidate/create-candidate",
        { name, category }
      );

      if (response.status === 201) {
        toast.success("Candidate added successfully!");
        setCandidates([...candidates, response.data.candidate]);
        setName("");
        setCategory("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add candidate.");
    } finally {
      setConfirmLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="w-[200px] text-center"
      />
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-[700px]">
        <h1 className="font-semibold capitalize mb-4">Candidates</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 outline-none p-2 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 outline-none p-2 rounded mr-2"
            />
          </div>
          <button
            type="submit"
            className="bg-[#443227] hover:bg-[#755947] text-white p-2 rounded"
          >
            Add Candidate
          </button>
        </form>
      </div>

      {/* Ant Design Modal for Confirmation */}
      <Modal
        title="Confirm Candidate Creation"
        open={modalOpen}
        onOk={handleConfirmSubmit}
        confirmLoading={confirmLoading}
        onCancel={() => setModalOpen(false)}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: "#e57226", borderColor: "#e57226" },
        }}
      >
        <p>Are you sure you want to add this candidate?</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Category:</strong> {category}</p>
      </Modal>
    </div>
  );
};

export default CreateVote;
