import React from "react";

import { useAuth } from "@/contexts/AuthContext";

type PropsType = {
  licenseNumber: string;
  requests: string[];
  setRequests: (newRequestList: string[]) => void;
};

export default function AgreeCard({
  licenseNumber,
  requests,
  setRequests,
}: PropsType) {
  const authContext = useAuth();
  if (!authContext) return;

  const onButtonClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const answer = (e.target as HTMLElement).innerText;
    try {
      const res = await fetch("http://localhost:8000/patient/agree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: JSON.stringify({ licenseNumber, answer }),
      });
      const json = await res.json();
      if (json.isSuccess) {
        const newRequestList = requests.filter(
          (request) => request !== licenseNumber
        );
        setRequests(newRequestList);
      } else {
        alert("Something went wrong . . .");
      }
    } catch (err) {
      console.error(err);
      alert("Error occured while accepting the request.");
    }
  };

  return (
    <div className="h-20 px-6 flex justify-between items-center border-2 border-[var(--dark-green)] rounded-lg mb-4">
      <span className="text-2xl font-bold">
        License Number: {licenseNumber}
      </span>
      <div className="flex justify-between items-center">
        <div
          onClick={onButtonClick}
          className="flex justify-center items-center text-white w-[120px] h-[35px] rounded-md bg-gray-400 hover:bg-red-400 cursor-pointer transition"
        >
          Decline
        </div>
        <div className="mx-4" />
        <div
          onClick={onButtonClick}
          className="flex justify-center items-center text-white w-[120px] h-[35px] rounded-md bg-[var(--light-green)] hover:bg-emerald-400 cursor-pointer transition"
        >
          Accept
        </div>
      </div>
    </div>
  );
}
