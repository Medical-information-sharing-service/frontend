"use client";
import React from "react";
import { useRouter } from "next/navigation";

type PropsType = {
  id: string;
  title: string;
  date: string;
  licenseNumber: string;
};

export default function DiagnosisCard({
  id,
  title,
  date,
  licenseNumber,
}: PropsType) {
  const router = useRouter();

  const onCardClick = () => {
    router.push(`/history/${id}`);
  };

  return (
    <div
      onClick={onCardClick}
      className="bg-white border-2 border-[var(--dark-green)] flex justify-between items-center px-8 py-6 rounded-md cursor-pointer hover:scale-[1.01] transition"
    >
      <span className="text-2xl font-bold">{title}</span>
      <div className="min-w-[20%] flex justify-end items-center">
        <span className="text-lg mr-6">{date}</span>
        <span className="text-lg">{licenseNumber}</span>
      </div>
    </div>
  );
}
