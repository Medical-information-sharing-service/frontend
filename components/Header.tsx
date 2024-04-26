"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();

  const authContext = useAuth();
  if (!authContext) return;

  const mode = authContext.loginStatus == 1 ? "patient" : "doctor";

  const onLogOutClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/logout", {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      const json = await res.json();
      if (json.isSuccess) {
        authContext.logout();
        router.push("/");
      } else alert("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      alert("Server error: Please try again later.");
    }
  };

  const onSignUpClick = () => {
    authContext.changeModalState(1);
  };

  const onLogInClick = () => {
    authContext.changeModalState(2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <div className="w-screen flex justify-between items-center px-[80px] py-8">
        <h1 className="text-6xl font-serif text-[var(--dark-green)] font-bold">
          <Link href="/">SKKUpital</Link>
        </h1>
        <div className="flex justify-center items-center">
          {authContext.loginStatus !== 0 ? (
            <div>
              <Link
                href={`/health-advice/${mode}`}
                className="cursor-pointer text-xl mr-12"
              >
                Health Advice
              </Link>
              <Link
                href={`/agree/${mode}`}
                className="cursor-pointer text-xl mr-12"
              >
                Agreement
              </Link>
              <Link
                href={`/history/${mode}`}
                className="cursor-pointer text-xl mr-12"
              >
                History
              </Link>
              <span
                onClick={onLogOutClick}
                className="cursor-pointer text-xl text-red-500"
              >
                Log out
              </span>
            </div>
          ) : (
            <div>
              <span
                onClick={onLogInClick}
                className="text-xl mr-12 cursor-pointer"
              >
                Log in
              </span>
              <span
                onClick={onSignUpClick}
                className="text-xl px-10 py-4 bg-[var(--dark-green)] text-white rounded-full cursor-pointer hover:bg-[var(--bright-green)] transition duration-200"
              >
                Sign up
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
