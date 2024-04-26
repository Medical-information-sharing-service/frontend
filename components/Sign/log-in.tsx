import React, { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import Input from "./Input";

export default function LogIn() {
  const [mode, setMode] = useState(0);
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [logInFailed, setLogInFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const authContext = useAuth();
  if (!authContext) return;

  const onClickX = () => {
    authContext.changeModalState(0);
  };

  const onClickMode = (e: React.MouseEvent<HTMLElement>) => {
    const val = (e.target as HTMLElement).textContent;
    if (val === "Doctor") setMode(1);
    else setMode(0);
    setLogInFailed(false);
  };

  const onSignUpButtonClick = () => {
    authContext.changeModalState(1);
  };

  const onLogInClick = async () => {
    try {
      const obj = {
        identity: mode === 0 ? "patient" : "user",
        id: mode === 0 ? email : licenseNumber,
        reqBody:
          mode === 0
            ? {
                patientId: email,
                password,
              }
            : {
                licenseNumber,
                password,
              },
      };
      const res = await fetch(`http://localhost:8000/${obj.identity}/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(obj.reqBody),
      });
      const json = await res.json();
      if (json.isSuccess) {
        authContext.changeModalState(0);
        setLogInFailed(false);
        authContext.login(obj.id, mode + 1, json.token);
      } else {
        setLogInFailed(true);
        setErrorMsg(json.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error: Please try again later.");
    }
  };

  return (
    <div>
      <div
        onClick={onClickX}
        className="absolute top-0 left-0 right-0 w-screen h-screen bg-gray-500/70 z-20"
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] bg-[var(--background-beige)] p-12 rounded-lg z-20">
        <div className="flex flex-col justify-center items-center relative">
          <div
            onClick={onClickX}
            className="absolute top-[-20px] right-[-6px] text-[26px] text-gray-500 cursor-pointer"
          >
            X
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[40px] text-[var(--dark-green)] font-bold">
              Welcome to SKKUpital
            </p>
            <p>
              <span className="mr-3 text-xl">Not signed up yet?</span>
              <span
                onClick={onSignUpButtonClick}
                className="underline text-blue-700 text-xl cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
          <div className="my-4" />
          <div>
            <div className="w-full flex justify-between items-center">
              <div
                onClick={onClickMode}
                className="outline-none h-14 w-[230px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4 bg-white content-center cursor-pointer"
              >
                <div className="flex justify-start items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-4 ${
                      mode === 0 ? "bg-blue-400" : "bg-gray-400"
                    }`}
                  />
                  <span>Patient</span>
                </div>
              </div>
              <div
                onClick={onClickMode}
                className="outline-none h-14 w-[230px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4 bg-white content-center cursor-pointer"
              >
                <div className="flex justify-start items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-4 ${
                      mode === 1 ? "bg-blue-400" : "bg-gray-400"
                    }`}
                  />
                  <span>Doctor</span>
                </div>
              </div>
            </div>
            <div className="my-4" />
            {mode === 0 ? (
              <div>
                <Input
                  value={email}
                  placeholder="Your email address"
                  setValue={setEmail}
                />
                <div className="my-4" />
                <Input
                  value={password}
                  placeholder="Create a password"
                  setValue={setPassword}
                />
              </div>
            ) : (
              <div>
                <Input
                  value={licenseNumber}
                  placeholder="Your license number"
                  setValue={setLicenseNumber}
                />
                <div className="my-4" />
                <Input
                  value={password}
                  placeholder="Create a password"
                  setValue={setPassword}
                />
              </div>
            )}
          </div>
          <div className="my-4" />
          <div
            className={`w-full flex ${
              logInFailed ? "justify-between" : "justify-end"
            } items-center px-3`}
          >
            {logInFailed ? (
              <p className="text-lg text-red-500">{errorMsg}</p>
            ) : undefined}
            <div
              onClick={onLogInClick}
              className="bg-[var(--light-green)] text-white px-6 py-3 rounded-xl text-xl cursor-pointer hover:bg-emerald-400 transition duration-200"
            >
              Log in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
