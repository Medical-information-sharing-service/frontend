import React from "react";

type PropsType = {
  title: string;
  licenseNumber: string;
  diagnosisDate: string;
};

export default function HistoryTitle({
  title,
  licenseNumber,
  diagnosisDate,
}: PropsType) {
  const date = diagnosisDate.split("T")[0];
  return (
    <div className="w-[1000px] border-b-2 border-gray-700 mb-10 pb-3 px-5 flex justify-between items-center">
      <div>
        <div className="w-8 h-1 bg-[var(--dark-green)]" />
        <h3 className="text-4xl font-bold">{title}</h3>
      </div>
      <div className="flex justify-center items-center">
        <span>License Number: {licenseNumber}</span>
        <div className="mx-4" />
        <span>{date}</span>
      </div>
    </div>
  );
}
