import { XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Dummy data
  const dummyList = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    message: `This is a dummy message for user ${index + 1}`,
    time: "Just now",
  }));

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password.toLowerCase() !== "sancta sedes") {
      setError("Invalid password. Please try again.");
    } else {
      setError("");
      setIsModal(false);
    }
  };

  return (
    <section id="pricing" className="pt-8 bg-[#1a1a2e] text-white h-auto min-h-screen pb-8">
      <button onClick={() => { navigate("/"); }} className="absolute top-10 right-10 flex items-center">
        Close <XCircleIcon className="h-7 w-7" />
      </button>
      <div className="container mx-auto px-4">
        <div className="container mx-w-4xl px-5 mt-6 flex flex-col gap-5">
          <div className="mx-auto w-full bg-black rounded-lg shadow-lg">
            {dummyList.map((user) => (
              <div key={user.id} onClick={() => setIsModal(true)} className="p-4 border-b border-gray-700 flex items-center">
                <img src="https://archive.org/download/placeholder-image/placeholder-image.jpg" className="w-10 h-10 rounded-full mr-3" alt="Avatar" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.message}</p>
                </div>
                <span className="text-gray-500 text-xs">{user.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className={`modal ${isModal ? "modal-open" : ""}`}>
        <div className="max-h-[calc(100vh-5em)] col-start-1 row-start-1 w-11/12 max-w-xl scale-90 transform translate-x-var(--tw-translate-x) translate-y-var(--tw-translate-y) rotate-var(--tw-rotate) skew-x-var(--tw-skew-x) skew-y-var(--tw-skew-y) scale-x-[0.9] scale-y-[0.9] rounded-box border border-grey bg-black p-6 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl overflow-y-auto overscroll-contain">
          <div className="w-full">
            <label htmlFor="password" className="block mb-2 text-sm font-bold spaceGrotesk">Password</label>
            <div className="bg-purple border font-semibold sm:text-sm rounded-lg outline-none w-full p-2.5 text-white flex items-center border-purple_dark">
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value.toLowerCase()); setError(""); }}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-transparent font-semibold sm:text-sm rounded-lg outline-none block w-full text-white"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <GoEyeClosed /> : <GoEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="modal-action">
            <button className="btn bg-primary text-white" onClick={handleSubmit}>Submit</button>
            <button className="btn bg-secondary text-white" onClick={() => setIsModal(false)}>Close</button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Index;