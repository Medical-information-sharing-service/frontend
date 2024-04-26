"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Title from "@/components/Title";
import { useAuth } from "@/contexts/AuthContext";
import DiagnosisCard from "@/components/History/DiagnosisCard";
import { History } from "@/types/History";

export default function DoctorHistoryPage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState<History[]>([]);

  const authContext = useAuth();
  if (!authContext) return;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(e.target.value);
  };

  const onViewHistoryClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/history/doctor/records", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        method: "POST",
        body: JSON.stringify({ patientId }),
      });
      const json = await res.json();
      if (json.isSuccess) {
        setIsVisible(true);
        setHistory(json.history);
      } else {
        setIsVisible(false);
        alert(
          "Something went wrong while trying to view the patient's past diagnoses results."
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred trying to view the patient's history");
    }
  };

  const onBackClick = () => {
    setPatientId("");
    setIsVisible(false);
    setHistory([]);
  };

  const onAddClick = () => {
    router.push(`/history/doctor/${patientId}`);
  };

  return (
    <section className="relative h-screen w-screen flex justify-center items-center">
      <Header />
      {isVisible ? (
        <div className="w-[50%]">
          <Title title={`${patientId}’s Past Diagnoses Results`} />
          <div>
            {history.length !== 0 ? (
              history.map((el) => {
                const date = el.diagnosisDate.split("T")[0];
                return (
                  <div key={el._id}>
                    <DiagnosisCard
                      id={el._id}
                      title={el.title}
                      date={date}
                      licenseNumber={el.licenseNumber}
                    />
                    <div className="my-4" />
                  </div>
                );
              })
            ) : (
              <div className="text-center my-12 text-2xl font-bold text-gray-400">
                {patientId} has no diagnoses results yet
              </div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <div
              onClick={onBackClick}
              className="w-[120px] px-3 py-2 bg-gray-400 rounded-lg text-lg text-white text-center cursor-pointer hover:bg-gray-500 transition"
            >
              Back
            </div>
            <div
              onClick={onAddClick}
              className="w-[160px] px-3 py-2 bg-[var(--light-green)] rounded-lg text-lg text-white text-center cursor-pointer hover:bg-emerald-400 transition"
            >
              Add a Diagnosis
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </section>
  );
}
