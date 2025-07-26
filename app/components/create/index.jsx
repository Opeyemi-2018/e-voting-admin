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
  const [imageFile, setImageFile] = useState(null); // actual File
  const [imagePreview, setImagePreview] = useState(null); // for preview
  const [base64Image, setBase64Image] = useState(""); // base64 string for backend
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !base64Image) {
      toast.error("Name and image are required.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmLoading(true);

    try {
      const payload = {
        name,
        category,
        image: base64Image,
      };

      const response = await axios.post(
        "http://localhost:5000/api/candidate/create-candidate",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        toast.success("Candidate added successfully!");
        setCandidates([...candidates, response.data.candidate]);
        setName("");
        setCategory("President");
        setImageFile(null);
        setImagePreview(null);
        setBase64Image("");
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 outline-none p-2 rounded mr-2"
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="General Secretary">General Secretary</option>
              <option value="Assistant General Secretary">
                Assistant General Secretary
              </option>
              <option value="PRO">PRO</option>
            </select>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 outline-none p-2 rounded"
          />
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
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        {imagePreview && (
          <div className="mt-2">
            <p>
              <strong>Selected Image:</strong>
            </p>
            <img
              src={imagePreview}
              alt="Candidate Preview"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreateVote;
