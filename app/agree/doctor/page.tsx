"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function DoctorAgreePage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const authContext = useAuth();
  if (!authContext) return;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(e.target.value);
  };

  const onRequestClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/agree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: JSON.stringify({ patientId }),
      });
      const json = await res.json();
      if (json.isSuccess) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        alert(
          "You already have the authority to reference the patient's diagnosis information."
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while asking for the patient's agreement . . .");
    }
  };

  const onHomeClick = () => {
    router.push("/");
  };

  const onAnotherRequestClick = () => {
    setIsSuccess(false);
    setPatientId("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Header />
      <div className="w-[800px] h-[400px] rounded-lg border-2 border-[var(--dark-green)] bg-[var(--background-beige)] py-10 flex flex-col justify-center items-center">
        {isSuccess ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold mb-16">
              Successfully requested the consent from the patient.
            </p>
            <div className="flex justify-center items-center">
              <div
                onClick={onHomeClick}
                className="text-2xl w-[160px] h-10 rounded-md bg-[var(--light-green)] hover:bg-emerald-500 text-white flex justify-center items-center transition mx-14 cursor-pointer"
              >
                Home
              </div>
              <div
                onClick={onAnotherRequestClick}
                className="text-lg w-[160px] h-10 rounded-md bg-[var(--light-green)] hover:bg-emerald-500 text-white flex justify-center items-center transition mx-14 cursor-pointer"
              >
                Another Request
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold mb-[60px]">
              Which patient will you be asking for consent?
            </p>
            <input
              onChange={onInputChange}
              type="text"
              className="w-[400px] h-[50px] border-2 border-[var(--soft-green)] rounded-lg text-xl px-3 outline-none mb-6"
              placeholder="Patient's ID"
            />
            <div className="w-[400px] flex justify-end items-end">
              <div
                onClick={onRequestClick}
                className="w-[140px] h-[40px] flex justify-center items-center text-white rounded-full bg-[var(--light-green)] hover:bg-emerald-400 transition text-xl cursor-pointer"
              >
                Request
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
