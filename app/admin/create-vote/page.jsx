"use client";

import Modal from "@/app/components/modals";
import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [number, setNumber] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddNumber = () => {
    if (!number.trim()) {
      setMessage("❌ Please enter a number.");
      return;
    }

    const formattedNumber = number.toUpperCase();

    if (numbersList.includes(formattedNumber)) {
      setMessage("❌ Number already added.");
      return;
    }

    setNumbersList([...numbersList, formattedNumber]);
    setNumber("");
    setMessage("");
  };

  const handleSubmit = () => {
    if (numbersList.length === 0) {
      setMessage("❌ Please add at least one number.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      let successCount = 0;
      let errorCount = 0;

      for (let num of numbersList) {
        try {
          const response = await axios.post("http://localhost:5000/api/unique-number/generate-unique-number", { uniqueNumber: num });
          if (response.status === 201) successCount++;
        } catch (error) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        setMessage(`✅ ${successCount} numbers saved successfully!`);
      }
      if (errorCount > 0) {
        setMessage(`⚠️ ${errorCount} numbers were already saved or had issues.`);
      }

      setNumbersList([]);
      setModalOpen(false);
    } catch (error) {
      setModalOpen(false);
      setMessage("❌ Something went wrong.");
    }
  };

  const handleCancelSubmit = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Navbar title="Create Vote" />
      <div className="flex justify-between md:flex-row flex-col gap-2 mt-10">
        <div>Create Vote</div>

        <div className="flex flex-col items-center p-6 min-h-screen">
          <h1 className="font-semibold mb-4 capitalize">Generate and submit a unique voter ID</h1>

          <div className="bg-white p-6 shadow-lg rounded-lg w-80">
            <input
              type="text"
              placeholder="Enter CSC number (e.g., CSC1)"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleAddNumber}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-4"
            >
              Add Number
            </button>

            <div className="border-t pt-3">
              {numbersList.length > 0 && (
                <ul className="mb-4">
                  {numbersList.map((num, index) => (
                    <li key={index} className="text-gray-700 font-medium">
                      {num}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-[#443227] text-white py-2 rounded hover:bg-[#755947]"
              >
                Submit Numbers
              </button>
            </div>
          </div>

          {message && <p className="mt-3 text-red-500">{message}</p>}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCancelSubmit}
        onProceed={handleConfirmSubmit}
        title="Are you sure you want to submit?"
      />
    </div>
  );
};

export default Page;
