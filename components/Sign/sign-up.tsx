import React, { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import Input from "./Input";
import GenderSelection from "./GenderSelection";

export default function SignUp() {
  const [mode, setMode] = useState(0); //  0: Patient, 1: Doctor
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [institution, setInstitution] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [gender, setGender] = useState("male");
  const [residentNumber, setResidentNumber] = useState("");
  const [doctorList, setDoctorList] = useState("");
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [logInFailed, setLogInFailed] = useState(false);

  const authContext = useAuth();
  if (!authContext) return;

  const onClickX = () => {
    authContext.changeModalState(0);
  };

  const onLogInButtonClick = () => {
    authContext.changeModalState(2);
  };

  const onClickMode = (e: React.MouseEvent<HTMLElement>) => {
    const val = (e.target as HTMLElement).textContent;
    if (val === "Doctor") setMode(1);
    else setMode(0);
    setIsSignUpFailed(false);
  };

  const onSignUpClick = async () => {
    if (
      mode === 0 &&
      (email.trim() === "" ||
        password.trim() === "" ||
        name.trim() === "" ||
        address.trim() === "" ||
        residentNumber.trim() === "")
    ) {
      setIsSignUpFailed(true);
      return;
    } else if (
      mode === 1 &&
      (licenseNumber.trim() === "" ||
        password.trim() === "" ||
        name.trim() === "" ||
        institution.trim() === "")
    ) {
      setIsSignUpFailed(true);
      return;
    }
    const identity = `${mode === 0 ? "patient" : "user"}`;
    const id = mode === 0 ? email : licenseNumber;
    const reqBody =
      mode === 0
        ? {
            patientId: email,
            name,
            gender,
            address,
            residentNumber,
            password,
            doctorList,
          }
        : {
            doctorName: name,
            password,
            licenseNumber,
            medicalInstitution: institution,
            diagnosisCode,
          };
    try {
      const res = await fetch(`http://localhost:8000/${identity}/join`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqBody),
      });
      const json = await res.json();
      if (json.isSuccess) {
        authContext.changeModalState(0);
        setIsSignUpFailed(false);
        authContext.login(id, mode + 1, json.token);
      } else {
        setIsSignUpFailed(true);
        setErrorMsg(json.message);
        alert("Sign up failed . . .");
        return;
      }
      const loginReqBody =
        mode === 0
          ? {
              patientId: email,
              password,
            }
          : {
              licenseNumber,
              password,
            };
      const loginRes = await fetch(`http://localhost:8000/${identity}/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginReqBody),
      });
      const loginJson = await loginRes.json();
      if (loginJson.isSuccess) {
        authContext.changeModalState(0);
        setLogInFailed(false);
        authContext.login(id, mode + 1, loginJson.token);
      } else {
        setLogInFailed(true);
        setErrorMsg(json.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error occured while signing up . . .");
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
              <span className="mr-3 text-xl">Already signed up?</span>
              <span
                onClick={onLogInButtonClick}
                className="underline text-blue-700 text-xl cursor-pointer"
              >
                Log in
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
                <div className="my-4" />
                <Input
                  value={name}
                  placeholder="Your full name"
                  setValue={setName}
                />
                <div className="my-4" />
                <Input
                  value={address}
                  placeholder="Your address"
                  setValue={setAddress}
                />
                <div className="my-4" />
                <GenderSelection gender={gender} setGender={setGender} />
                <div className="my-4" />
                <Input
                  value={residentNumber}
                  placeholder="YYMMDD"
                  setValue={setResidentNumber}
                />
                <div className="my-4" />
                <Input
                  value={doctorList}
                  placeholder="Doctor list / Empty"
                  setValue={setDoctorList}
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
                <div className="my-4" />
                <Input
                  value={name}
                  placeholder="Your full name"
                  setValue={setName}
                />
                <div className="my-4" />
                <Input
                  value={institution}
                  placeholder="Medical Institution"
                  setValue={setInstitution}
                />
                <div className="my-4" />
                <select
                  name="code"
                  id="code"
                  className="outline-none h-14 w-[480px] rounded-lg border-2 border-[var(--soft-green)] text-xl px-4"
                >
                  <option value="0">Internal Medicine(내과)</option>
                  <option value="1">Surgery(외과)</option>
                  <option value="2">Obstetrics(산부인과)</option>
                  <option value="3">Dermatology(피부과)</option>
                  <option value="4">Urology(비뇨기과)</option>
                  <option value="5">Ophthalmology(안과)</option>
                  <option value="6">Otorhinolaryngology(이비인후과)</option>
                  <option value="7">Dentistry(치과)</option>
                  <option value="8">Pediatrics(소아과)</option>
                  <option value="9">Others(그 외)</option>
                </select>
              </div>
            )}
          </div>
          <div className="my-4" />
          <div
            className={`w-full flex ${
              isSignUpFailed ? "justify-between" : "justify-end"
            } px-4`}
          >
            {logInFailed || isSignUpFailed ? (
              <p className="text-lg text-red-500">{errorMsg}</p>
            ) : undefined}
            <div
              onClick={onSignUpClick}
              className="bg-[var(--light-green)] text-white px-6 py-3 rounded-xl text-xl cursor-pointer hover:bg-emerald-400 transition duration-200"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
