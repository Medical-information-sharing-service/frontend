"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import SignUp from "@/components/Sign/sign-up";
import LogIn from "@/components/Sign/log-in";
import DirectionCard from "@/components/Homepage/DirectionCard";
import { patientExplanations } from "@/constant/homepage/patient/explanations";
import { doctorExplanations } from "@/constant/homepage/doctor/explanations";

const healthAdvice = "Health Advice";
const pastDiagnoses = "Past Diagnoses";
const Agree = "Agree";
const diagnosePatients = "Diagnose Patients";

export default function Home() {
  const authContext = useAuth();
  if (!authContext) return;

  const identity = authContext.loginStatus === 1 ? "patient" : "doctor";

  const onSignUpButtonClick = () => {
    authContext.changeModalState(1);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Header />
      <section className="relative flex justify-end items-center w-full h-full">
        <Image
          width={1080}
          height={1920}
          alt="A Homepage Image"
          src="/home-background.png"
          className="absolute w-full h-full -z-10"
        />
        <div className="flex flex-col justify-center items-center w-[60%] bg-white h-full">
          <div>
            <p className="text-[500%] font-bold text-[var(--dark-green)] font-serif -mb-8">
              No need to explain
            </p>
            <p className="text-[500%] font-bold text-[var(--dark-green)] font-serif">
              your symptoms
            </p>
          </div>
          <p className="w-[75%] mt-12 mb-20 text-xl">
            Agree in advance and enjoy the convenience of not having to
            repeatedly explain your symptoms and medical history at new
            hospitals.
          </p>
          {authContext.loginStatus === 0 ? (
            <span
              onClick={onSignUpButtonClick}
              className="flex justify-center items-center w-[200px] text-xl px-8 py-5 bg-[var(--dark-green)] text-white rounded-full cursor-pointer hover:bg-[var(--bright-green)] transition duration-200"
            >
              Sign up today
            </span>
          ) : authContext.loginStatus === 1 ? (
            <div className="flex">
              <DirectionCard
                title="Health Advice"
                explanation1={patientExplanations[healthAdvice].explanation1}
                explanation2={patientExplanations[healthAdvice].explanation2}
                buttonTitle="Get an Advice"
                url={`/health-advice/${identity}`}
              />
              <div className="mx-2" />
              <DirectionCard
                title="Past Diagnoses"
                explanation1={patientExplanations[pastDiagnoses].explanation1}
                explanation2={patientExplanations[pastDiagnoses].explanation2}
                buttonTitle="Go to History"
                url="/history/patient"
              />
              <div className="mx-2" />
              <DirectionCard
                title="Agree"
                explanation1={patientExplanations[Agree].explanation1}
                explanation2={patientExplanations[Agree].explanation2}
                buttonTitle="Go to Agree"
                url="/agree/patient"
              />
            </div>
          ) : (
            <div className="flex">
              <div className="w-[270px] h-[340px] flex flex-col justify-between items-center border-2 border-[var(--dark-green)] px-4 py-6">
                <h4 className="text-[26px] text-[var(--dark-green)] font-bold">
                  Request Agreement
                </h4>
                <div>
                  <p className="text-lg text-center mb-5">
                    Please request agreement about gathering patients’
                    information before you start diagnoses.
                  </p>
                </div>
                <Link
                  href="/agree/doctor"
                  className="w-[200px] px-2 py-3 bg-[var(--dark-green)] text-white rounded-full text-[18px] flex justify-center items-center"
                >
                  Request Agreement
                </Link>
              </div>
              <div className="mx-5" />
              <DirectionCard
                title="Past Diagnoses"
                explanation1={doctorExplanations[diagnosePatients].explanation1}
                explanation2={doctorExplanations[diagnosePatients].explanation2}
                buttonTitle="Go to History"
                url="/history/doctor"
              />
            </div>
          )}
        </div>
      </section>
      {authContext.modalState === 1 && <SignUp />}
      {authContext.modalState === 2 && <LogIn />}
    </main>
  );
}
