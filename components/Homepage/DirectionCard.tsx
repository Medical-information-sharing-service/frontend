import React from "react";
import Link from "next/link";

type PropsType = {
  title: string;
  explanation1: string;
  explanation2: string;
  buttonTitle: string;
  url: string;
};

export default function DirectionCard({
  title,
  explanation1,
  explanation2,
  buttonTitle,
  url,
}: PropsType) {
  return (
    <div className="w-[270px] h-[340px] flex flex-col justify-between items-center border-2 border-[var(--dark-green)] px-6 py-6">
      <h4 className="text-3xl text-[var(--dark-green)] font-bold">{title}</h4>
      <div>
        <p className="text-lg text-center mb-5">{explanation1}</p>
        <p className="text-lg text-center">{explanation2}</p>
      </div>
      <Link
        href={url}
        className="w-[180px] px-8 py-3 bg-[var(--dark-green)] text-white rounded-full text-lg flex justify-center items-center"
      >
        {buttonTitle}
      </Link>
    </div>
  );
}
