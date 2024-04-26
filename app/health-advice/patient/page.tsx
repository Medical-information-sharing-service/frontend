"use client";
import React, { useState } from "react";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function HealthAdvice() {
  const [mode, setMode] = useState(0);

  const authContext = useAuth();
  if (!authContext) return;

  const identity = authContext.loginStatus;
  const title =
    identity === 1
      ? "What advice do you want to get from AI?"
      : "Which patient would you like to generate health advice for?";

  const onGeneralAdviceClick = () => {
    setMode(0);
  };

  const onInputClick = () => {
    setMode(1);
  };

  const onGenerateAdviceClick = () => {
    const API_KEY = process.env.OPENAI_API_KEY;
    const ENDPOINT = "https://api.openai.com/v1/chat/completions";

    const askChatGPT = async (question: string) => {
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: question,
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from GPT-3:", data.choices[0].message.content);
      } catch (error) {
        console.error("Error asking GPT-3:", error);
        alert("Error occurred while getting a resoinse from AI . . .");
      }
    };

    askChatGPT("How does the solar system work?");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Header />
      <div className="w-[1000px] h-[730px] flex flex-col justify-start items-center rounded-lg bg-[var(--background-beige)] border-2 border-[var(--dark-green)] py-14">
        <p className="text-3xl font-bold text-center mb-14">{title}</p>
        <div className="flex flex-col justify-center items-end">
          <div
            onClick={onGeneralAdviceClick}
            className={`w-[600px] h-[50px] bg-white px-4 flex justify-start items-center border-2 ${
              mode === 0 ? "border-[var(--soft-green)]" : "border-gray-400"
            } rounded-lg text-xl cursor-pointer transition`}
          >
            Give me a general advice about my health.
          </div>
          <input
            onClick={onInputClick}
            type="text"
            className={`w-[600px] h-[400px] border-2 ${
              mode === 0 ? "border-gray-400" : "border-[var(--soft-green)]"
            } rounded-lg px-4 flex justify-start items-center outline-none text-xl transition my-4`}
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
    </div>
  );
}
