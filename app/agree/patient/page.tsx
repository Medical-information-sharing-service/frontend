"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import Title from "@/components/Title";
import AgreeCard from "@/components/Agree/AgreeCard";
import { useAuth } from "@/contexts/AuthContext";

export default function PatientAgreePage() {
  const [requests, setRequests] = useState<string[]>([]);

  const authContext = useAuth();

  useEffect(() => {
    const func = async () => {
      const res = await fetch("http://localhost:8000/patient/agree", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      const json = await res.json();
      if (json.isSuccess) {
        setRequests(json.agreeList);
      } else {
        alert("Failed to load agree list . . .");
      }
    };
    func();
  }, [authContext]);

  if (!authContext) return;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Header />
      <div className="w-[50%]">
        <Title title="Requested Agreements" />
        <div className="w-full">
          {requests.length === 0 ? (
            <div className="font-bold text-2xl text-gray-400">
              There is no requested agreements.
            </div>
          ) : (
            <div>
              {requests.map((req, idx) => (
                <div key={idx}>
                  <AgreeCard
                    licenseNumber={req}
                    requests={requests}
                    setRequests={setRequests}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
