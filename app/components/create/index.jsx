"use client";
import { useState } from "react";
import axios from "axios";
import Modal from "@/app/components/modals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) {
      toast.error("Name and category are required.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
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
    }

    setModalOpen(false);
  };

  const handleCancelSubmit = () => {
    toast.info("Candidate submission cancelled.");
    setModalOpen(false);
  };

  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="w-[200px] text-center"
      />
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-[700px]">
        <h1 className="font-semibold  capitalize mb-4">Candidates</h1>
        <form onSubmit={handleSubmit} className="mb-4  flex flex-col gap-4">
          <div className="flex  md:flex-row flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" w-full border border-gray-300 outline-none p-2 rounded mr-2"
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

          <Modal
            isOpen={modalOpen}
            onClose={handleCancelSubmit}
            onProceed={handleConfirmSubmit}
            title="Confirm Candidate Submission"
            bodyText={`Are you sure you want to add "${name}" under "${category}"?`}
          />
        </form>
      </div>

      {/* <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id} className="border p-2 mb-2 rounded">
            <h2 className="font-semibold">
            {candidate.name} ({candidate.category})
            </h2>
            <p>Votes: {candidate.votes}</p>
            <button
            onClick={() => handleVote(candidate._id)}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
            Vote
            </button>
            <button
            onClick={() => handleDelete(candidate._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CreateVote;
