"use client";
import Modal from "@/app/components/modals";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UniqueNumber = () => {
  const [number, setNumber] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddNumber = () => {
    if (!number.trim()) {
      toast.error("Please enter a number.");
      return;
    }

    const formattedNumber = number.trim().toUpperCase();

    if (numbersList.includes(formattedNumber)) {
      toast.warning("This number is already in the list.");
      return;
    }

    if (!/^CSC\d+$/i.test(formattedNumber)) {
      toast.error("Invalid format! Use CSC followed by numbers (e.g., CSC1)");
      return;
    }

    setNumbersList([...numbersList, formattedNumber]);
    setNumber("");
  };

  const handleRemoveNumber = (index) => {
    const newList = [...numbersList];
    newList.splice(index, 1);
    setNumbersList(newList);
    toast.info("Number removed from list");
  };

  const handleSubmit = async () => {
    if (numbersList.length === 0) {
      toast.error("Please add at least one number before submitting.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/unique-number/generate-unique-number",
        { uniqueNumbers: numbersList }
      );

      if (response.status === 201) {
        toast.success(`${numbersList.length} number(s) saved successfully!`);
        setNumbersList([]);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(
            `${
              error.response.data.message ||
              "One or more numbers already exist."
            }`
          );
        } else {
          toast.error(`Server error: ${error.response.status}`);
        }
      } else {
        toast.error("Network error - could not connect to server");
      }
    }
    setModalOpen(false);
  };

  const handleCancelSubmit = () => {
    toast.info("Submission cancelled");
    setModalOpen(false);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="w-[200px] text-center"
      />
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-[700px]">
        <h1 className="font-semibold mb-4 capitalize">
          Generate Unique Voter ID
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter CSC number (e.g., CSC1)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddNumber()}
            className="flex-1 p-2 outline-none border border-gray-300 rounded"
          />
          <button
            onClick={handleAddNumber}
            className="bg-[#e57226] text-white px-4 py-2 rounded hover:bg-[#b68666]"
          >
            Add
          </button>
        </div>

        {numbersList.length > 0 && (
          <div className="mb-4 border border-gray-200 rounded p-3">
            <h3 className="font-medium mb-2">
              Numbers to be submitted ({numbersList.length}):
            </h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {numbersList.map((num, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="font-mono">{num}</span>
                  <button
                    onClick={() => handleRemoveNumber(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded text-white ${
            numbersList.length === 0
              ? "bg-[#443227] cursor-not-allowed"
              : "bg-[#443227] hover:bg-[#755947] "
          }`}
          disabled={numbersList.length === 0}
        >
          {numbersList.length > 0
            ? `Submit ${numbersList.length} Number(s)`
            : "Submit Numbers"}
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCancelSubmit}
        onProceed={handleConfirmSubmit}
        title={`Confirm Submission of ${numbersList.length} Number(s)`}
        bodyText="Are you sure you want to submit these numbers?"
      />
    </div>
  );
};

export default UniqueNumber;
