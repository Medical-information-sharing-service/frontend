import React from "react";

type PropsType = {
  title: string;
};

export default function Title({ title }: PropsType) {
  return (
    <div>
      <div className="w-8 h-1 bg-[var(--dark-green)]" />
      <h3 className="text-4xl font-bold mb-10">{title}</h3>
    </div>
  );
}
