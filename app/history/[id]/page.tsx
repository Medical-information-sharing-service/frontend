"use client";
import React, { useEffect, useState } from "react";

import HistoryTitle from "@/components/History/HistoryTitle";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { History } from "@/types/History";

export default function DiagnosisPage({ params }: { params: { id: string } }) {
  const [history, setHistory] = useState<History>();

  const authContext = useAuth();

  useEffect(() => {
    const func = async () => {
      const historyId = params.id;
      const identity = authContext.loginStatus === 1 ? "patient" : "doctor";
      try {
        const res = await fetch(
          `http://localhost:8000/history/${identity}/record`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext.token}`,
            },
            body: JSON.stringify({ historyId }),
          }
        );
        const json = await res.json();
        if (json.isSuccess) {
          setHistory(json.history);
        }
      } catch (err) {
        console.error(err);
        alert("Error occured while loading the diagnosis data . . .");
      }
    };
    func();
  }, [authContext, params]);

  if (!authContext) return;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Header />
      {history ? (
        <div>
          <HistoryTitle
            title={history.title}
            licenseNumber={history.licenseNumber}
            diagnosisDate={history.diagnosisDate}
          />
          <div className="px-5">
            <h6 className="text-2xl font-bold mb-4">Diagnosis</h6>
            <div className="text-lg max-w-[960px] leading-9 mb-10">
              {history.diagnosis}
            </div>
            <h6 className="text-2xl font-bold mb-4">Prognosis</h6>
            <div className="text-lg max-w-[960px] leading-9">
              {history.prognosis}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold">
          Failed to load the diagnosis data . . .
        </div>
      )}
    </div>
  );
}
