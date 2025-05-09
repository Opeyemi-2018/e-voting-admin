"use client";
import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("President");
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !image) {
      toast.error("Name and image are required.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://e-voting-server-bxpt.onrender.com/api/candidate/create-candidate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success("Candidate added successfully!");
        setCandidates([...candidates, response.data.candidate]);
        setName("");
        setCategory("President");
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add candidate.");
    } finally {
      setConfirmLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} toastClassName="w-[200px] text-center" />
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 outline-none p-2 rounded mr-2"
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="General Secretary">General Secretary</option>
              <option value="Assistant General Secretary">Assistant General Secretary</option>
              <option value="PRO">PRO</option>
            </select>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 outline-none p-2 rounded"
          />
          <button type="submit" className="bg-[#443227] hover:bg-[#755947] text-white p-2 rounded">
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
        okButtonProps={{ style: { backgroundColor: "#e57226", borderColor: "#e57226" } }}
      >
        <p>Are you sure you want to add this candidate?</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Category:</strong> {category}</p>
        {image && (
          <div className="mt-2">
            <p><strong>Selected Image:</strong></p>
            <img src={URL.createObjectURL(image)} alt="Candidate Preview" className="w-24 h-24 object-cover mt-2 rounded" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreateVote;
