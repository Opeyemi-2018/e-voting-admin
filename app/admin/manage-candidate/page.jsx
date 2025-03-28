"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/app/components/navbar";
import Overview from "@/app/components/overview";
import Modal from "@/app/components/modals";
import { RiDeleteBinLine, RiResetLeftLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
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

  // Open modal and set candidate to delete
  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  // Confirm deletion
  const handleDeleteConfirm = async () => {
    if (!selectedCandidate) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/candidate/delete-candidate/${selectedCandidate._id}`
      );
      setCandidates((prev) =>
        prev.filter((candidate) => candidate._id !== selectedCandidate._id)
      );
      toast.success("Candidate deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete candidate");
    } finally {
      setIsModalOpen(false);
      setSelectedCandidate(null);
    }
  };

  return (
    <div>
      <Navbar title="manage vote" />
      <Overview />
      <div className="py-6">
        <ToastContainer />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize mb-4">Candidates</h2>
          <div className="flex gap-4 items-center">
            <button className="py-2 px-3 rounded-md bg-[#e57226] text-white">
              Filter by
            </button>
            <button className="py-2 px-3 flex gap-3 items-center rounded-md bg-[#e57226] text-white">
              Reset <RiResetLeftLine />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="spinner flex-col gap-6 flex items-center justify-center">
            <p>please wait while your data load</p>
            <ClipLoader color="#e57226" size={50} loading={loading} />
          </div>
        ) : candidates.length === 0 ? (
          <p className="text-gray-500">No candidates found</p>
        ) : (
          <div className="max-w-[700px] bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-between capitalize py-4 font-semibold">
              <p>Name</p>
              <p>Category</p>
              <p>Action</p>
            </div>

            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="flex capitalize justify-between"
              >
                <p>{candidate.name}</p>
                <p>{candidate.category}</p>
                <button onClick={() => handleDeleteClick(candidate)}>
                  <RiDeleteBinLine size={25} color="red" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={handleDeleteConfirm}
        title="Are you sure you want to delete this candidate?"
      />
    </div>
  );
};

export default Page;
