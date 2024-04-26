"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import DiagnosisCard from "@/components/History/DiagnosisCard";
import Title from "@/components/Title";
import NoData from "@/components/History/NoData";
import { useAuth } from "@/contexts/AuthContext";
import { History } from "@/types/History";

export default function PatientHistoryPage() {
  const authContext = useAuth();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/history/patient/records",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext.token}`,
            },
          }
        );
        const json = await res.json();
        setHistory(json.history);
      } catch (err) {
        console.error(err);
        alert("Failed to load history data . . .");
      }
    };
    func();
  }, [authContext.id, authContext.token]);

  if (!authContext) return;

  return (
    <section className="relative h-screen w-screen flex justify-center items-center">
      <Header />
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className="w-full">
          <Title title="My Past Diagnoses Results" />
          <div>
            {history.length !== 0 ? (
              history.map((el: History) => {
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
              <NoData />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
