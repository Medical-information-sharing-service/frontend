"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function AddDiagnosis() {
  const router = useRouter();
  const pathname = usePathname();
  const patientId = pathname.split("/")[3];

  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prognosis, setPrognosis] = useState("");

  const authContext = useAuth();
  if (!authContext) return;

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDiagnosisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiagnosis(e.target.value);
  };

  const onPrognosisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrognosis(e.target.value);
  };

  const onCancelClick = () => {
    const answer = confirm("Are you sure you want to cancel?");
    if (answer) router.push("/history/doctor");
  };

  const onSaveClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/history/creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: JSON.stringify({
          patientId,
          diagnosisCode: -1,
          prognosis,
          title,
          diagnosis,
        }),
      });
      const json = await res.json();
      if (json.isSuccess) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong . . .");
    }
  };

  const onHomeClick = () => {
    router.push("/");
  };

  const onAnotherDiagnosisClick = () => {
    setIsSuccess(false);
    setTitle("");
    setDiagnosis("");
    setPrognosis("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Header />
      {isSuccess ? (
        <div className="w-[600px] h-[300px] flex flex-col justify-center items-center bg-[var(--background-beige)] rounded-lg px-6 py-8 border-2 border-[var(--dark-green)]">
          <p className="text-3xl font-bold mb-10">
            Successfully uploaded a new diagnosis!
          </p>
          <div className="w-full flex justify-between items-center px-4">
            <div
              onClick={onHomeClick}
              className="cursor-pointer text-xl text-white rounded-md w-[120px] h-9 bg-[var(--light-green)] hover:bg-emerald-500 transition flex justify-center items-center"
            >
              Home
            </div>
            <div
              onClick={onAnotherDiagnosisClick}
              className="cursor-pointer text-md text-white rounded-md w-[140px] h-9 bg-[var(--light-green)] hover:bg-emerald-500 transition flex justify-center items-center"
            >
              Another Diagnosis
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[800px] flex flex-col justify-start items-center bg-[var(--background-beige)] rounded-lg px-6 py-8 border-2 border-[var(--dark-green)]">
          <p className="text-3xl font-bold mb-4">Diagnosis</p>
          <div className="w-4/5">
            <p className="text-2xl font-bold mb-1">Title</p>
            <input
              onChange={onTitleChange}
              type="text"
              className="w-full outline-none rounded-lg border-2 border-[var(--soft-green)] h-12 mb-4 px-4 text-lg"
            />
          </div>
          <div className="w-4/5">
            <p className="text-2xl font-bold mb-1">Diagnosis</p>
            <textarea
              onChange={onDiagnosisChange}
              className="w-full outline-none rounded-lg border-2 border-[var(--soft-green)] mb-4 h-[200px] px-4 py-2 text-lg"
            />
          </div>
          <div className="w-4/5">
            <p className="text-2xl font-bold mb-1">Prognosis</p>
            <textarea
              onChange={onPrognosisChange}
              className="w-full outline-none rounded-lg border-2 border-[var(--soft-green)] mb-6 h-[200px] px-4 py-2 text-lg"
            />
          </div>
          <div className="w-4/5 flex justify-between items-center">
            <div
              onClick={onCancelClick}
              className="w-[120px] h-10 flex justify-center items-center text-white bg-gray-400 hover:bg-gray-500 transition rounded-lg text-xl cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={onSaveClick}
              className="w-[120px] h-10 flex justify-center items-center text-white bg-[var(--light-green)] hover:bg-emerald-400 transition rounded-lg text-xl cursor-pointer"
            >
              Save
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
