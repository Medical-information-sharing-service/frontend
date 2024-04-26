import React from "react";

type PropsType = {
  placeholder: string;
  setValue: (value: string) => void;
  value: string;
};

export default function Input({ placeholder, setValue, value }: PropsType) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      placeholder={placeholder}
      className="outline-none h-14 w-[480px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4"
    />
  );
}
