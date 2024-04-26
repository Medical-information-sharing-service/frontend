"use client";
import React, { useState } from "react";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { History } from "@/types/History";

export default function PatientHealthAdvice() {
  const [mode, setMode] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<History[]>([]);
  const [response, setResponse] = useState("");

  const authContext = useAuth();
  if (!authContext) return;

  const title = "Which patient would you like to generate health advice for?";

  const onGeneralAdviceClick = () => {
    setMode(0);
  };

  const onInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(e.target.value);
  };

  const onTextareaClick = () => {
    setMode(1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const onGenerateAdviceClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/history/doctor/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: JSON.stringify({ patientId }),
      });
      const json = await res.json();
      if (json.isSuccess) {
        setHistory(json.history);
      } else {
        alert("Failed to load history information . . .");
        return;
      }
      let reqBody: string[] = [];
      history.forEach((el) => {
        reqBody.push(el.diagnosis);
      });
      const gptRes = await fetch("/health-advice/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, reqBody, prompt }),
      });
      const gptJson = await gptRes.json();
      setResponse(gptJson.response);
    } catch (err) {
      console.error(err);
      alert("Something went wrong . . .");
    }
  };

  const onBackButtonClick = () => {
    setPrompt("");
    setHistory([]);
    setResponse("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center mt-5">
      <Header />
      <div className="w-[1000px] h-[730px] flex flex-col justify-start items-center rounded-lg bg-[var(--background-beige)] border-2 border-[var(--dark-green)] py-14">
        {response === "" ? (
          <div className="w-[600px]">
            <p className="text-3xl font-bold text-center mb-14">{title}</p>
            <div className="flex flex-col justify-center items-end">
              <input
                onChange={onInputClick}
                onClick={onGeneralAdviceClick}
                placeholder="Give me a health advice of the patient"
                className={`w-full h-[50px] bg-white px-4 flex justify-start items-center border-2 ${
                  mode === 0 ? "border-[var(--dark-green)]" : "border-gray-400"
                } rounded-lg text-xl transition outline-none`}
              />
              <textarea
                cols={30}
                rows={10}
                onChange={onInputChange}
                onClick={onTextareaClick}
                className={`w-full h-[400px] border-2 ${
                  mode === 0 ? "border-gray-400" : "border-[var(--dark-green)]"
                } rounded-lg py-3 px-5 flex justify-start items-center outline-none text-xl transition my-4`}
                placeholder="I want to freely ask you about my health."
              />
              <div
                onClick={onGenerateAdviceClick}
                className="bg-[var(--light-green)] rounded-full w-[140px] h-9 hover:bg-emerald-400 text-white flex justify-center items-center transition cursor-pointer"
              >
                Generate Advice
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[80%] flex flex-col justify-center items-center">
            <p className="text-3xl font-bold text-center mb-14">
              Response from AI
            </p>
            <div className="text-lg leading-10 text-justify mb-5">
              {response}
            </div>
            <div className="w-full flex justify-end items-center">
              <div
                onClick={onBackButtonClick}
                className="flex justify-center items-center w-[140px] h-9 rounded-lg text-xl text-white bg-gray-400 hover:bg-gray-500 transition cursor-pointer"
              >
                <span>Back</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
