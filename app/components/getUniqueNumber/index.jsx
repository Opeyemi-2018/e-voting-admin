"use client";
import { useEffect, useState } from "react";
import Modal from "@/app/components/modals";
import { RiDeleteBinLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const GetUniqueNumber = () => {
  const [loading, setLoading] = useState(true);
  const [uniqueNumbers, setUniqueNumbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  //fetching unique number
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

  // deleting unique number
  const confirmDelete = (id) => {
    setSelectedNumber(id);
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDeleteConfirm = async () => {
    if (!selectedNumber) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/unique-number/delete-unique-number/${selectedNumber}`
      );
      setUniqueNumbers((prev) =>
        prev.filter((num) => num._id !== selectedNumber)
      );
      toast.success("successfully deleted");
    } catch (err) {
      console.error("Error deleting number:", err);
      toast.error("Failed to delete number");
    } finally {
      setIsModalOpen(false);
      setSelectedNumber(null);
    }
  };
  return (
    <div className="max-w-[300px]">
      <ToastContainer />

      <div className="w-[300px]">
        <h2 className="text-2xl font-semibold capitalize mb-4">
          verified voters ID
        </h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div>
            <p className="font-medium">Total Count: {uniqueNumbers.length}</p>
            <ul className="mt-3 space-y-2">
              {loading ? (
                <div>
                  <ClipLoader color="#e57226" size={50} loading={loading} />
                </div>
              ) : uniqueNumbers.length > 0 ? (
                uniqueNumbers.map((num, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 rounded flex items-center justify-between"
                  >
                    {num.uniqueNumber}{" "}
                    <RiDeleteBinLine
                      size={25}
                      color="red"
                      onClick={() => confirmDelete(num._id)}
                    />
                  </li>
                ))
              ) : (
                <p>No unique numbers found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={handleDeleteConfirm}
        title="Are you sure you want to delete this candidate?"
      />
    </div>
  );
};

export default GetUniqueNumber;
