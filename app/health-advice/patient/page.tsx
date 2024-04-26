"use client";
import React, { useState } from "react";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function HealthAdvice() {
  const [mode, setMode] = useState(0);
  const [prompt, setPrompt] = useState("");

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

  const askChatGPT = async (question: string) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            // model: "gpt-3.5-turbo",
            model: "text-davinci-003",
            messages: [
              {
                role: "system",
                content:
                  "You are an assistant who helps people get an advice about their health. Based on the information they provide, you tell people what is beneficial for their health.",
              },
              {
                role: "user",
                content: question,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Response from AI:", json.choices[0]);
    } catch (error) {
      console.error("Error asking AI:", error);
      alert("Error occurred while getting a response from AI . . .");
    }
  };

  const onGenerateAdviceClick = async () => {
    askChatGPT("Give me a general advice about my health.");
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
              mode === 0 ? "border-[var(--dark-green)]" : "border-gray-400"
            } rounded-lg text-xl cursor-pointer transition`}
          >
            Give me a general advice about my health.
          </div>
          <input
            onClick={onInputClick}
            type="text"
            className={`w-[600px] h-[400px] border-2 ${
              mode === 0 ? "border-gray-400" : "border-[var(--dark-green)]"
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
