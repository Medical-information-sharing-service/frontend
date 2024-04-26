"use client";
import React, { useState } from "react";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function DoctorHistoryPage() {
  const [patientId, setPatientId] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(e.target.value);
  };

  const onViewHistoryClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/history/doctor/records", {
        headers: { Authorization: `Bearer ${authContext.token}` },
        method: "POST",
        body: JSON.stringify({ patientId }),
      });
      const json = await res.json();
      console.log(json);
    } catch (err) {
      console.error(err);
      alert("Error occurred trying to view the patient's history");
    }
  };

  const authContext = useAuth();
  if (!authContext) return;

  return (
    <section className="relative h-screen w-screen flex justify-center items-center">
      <Header />
      <div className="w-[800px] h-[400px] flex flex-col justify-start items-center border-2 border-[var(--dark-green)] bg-[var(--background-beige)] rounded-lg py-8 px-10">
        <p className="font-bold text-3xl">
          Who’s past diagnoses do you want to reference?
        </p>
        <div className="flex flex-col justify-center items-end">
          <input
            type="text"
            value={patientId}
            onChange={onChange}
            className="w-[400px] h-[50px] px-4 text-lg rounded-md border-2 border-[var(--soft-green)] outline-none mt-[100px] mb-6"
            placeholder="Patient's ID"
          />
          <div
            onClick={onViewHistoryClick}
            className="cursor-pointer bg-[var(--light-green)] text-white text-lg px-4 py-2 rounded-full hover:bg-emerald-400 transition"
          >
            View History
          </div>
        </div>
      </div>
    </section>
  );
}
