import React from "react";

type PropsType = {
  gender: string;
  setGender: (value: string) => void;
};

export default function GenderSelection({ gender, setGender }: PropsType) {
  const onClickGender = (e: React.MouseEvent<HTMLElement>) => {
    const val = (e.target as HTMLElement).textContent;
    if (val === "Male") {
      setGender("male");
    } else {
      setGender("female");
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div
        onClick={onClickGender}
        className="outline-none h-14 w-[230px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4 bg-white content-center cursor-pointer"
      >
        <div className="flex justify-start items-center">
          <div
            className={`w-4 h-4 rounded-full mr-4 ${
              gender === "male" ? "bg-blue-400" : "bg-gray-400"
            }`}
          />
          <span>Male</span>
        </div>
      </div>
      <div
        onClick={onClickGender}
        className="outline-none h-14 w-[230px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4 bg-white content-center cursor-pointer"
      >
        <div className="flex justify-start items-center">
          <div
            className={`w-4 h-4 rounded-full mr-4 ${
              gender === "female" ? "bg-blue-400" : "bg-gray-400"
            }`}
          />
          <span>Female</span>
        </div>
      </div>
    </div>
  );
}
