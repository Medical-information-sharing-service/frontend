"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  loginStatus: number;
  token: string;
  modalState: number;
  id: string;
  logout: () => void;
  login: (id: string, mode: number, token: string) => void;
  changeModalState: (state: number) => void;
};

const AuthContext = createContext<AuthContextType>({
  loginStatus: 0,
  token: "",
  modalState: 0,
  id: "",
  logout: () => {},
  login: (id: string, mode: number, token: string) => {},
  changeModalState: (state: number) => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loginStatus, setLoginStatus] = useState(0); // 0: Not logged in, 1: Patients logged in, 2: Doctors logged in
  const [token, setToken] = useState("");
  const [modalState, setModalState] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    const initLoginStatus = parseInt(
      localStorage.getItem("loginStatus") || "0"
    );
    const initToken = localStorage.getItem("token") || "";
    const initId = localStorage.getItem("id") || "";
    setLoginStatus(initLoginStatus);
    setToken(initToken);
    setId(initId);
  }, []);

  const logout = () => {
    setLoginStatus(0);
    setToken("");
    setId("");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  const login = (id: string, mode: number, token: string) => {
    setLoginStatus(mode); // 1: patient, 2: doctor
    setToken(token);
    setId(id);
    localStorage.setItem("loginStatus", mode.toString());
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
  };

  const changeModalState = (state: number) => {
    setModalState(state); // 0: no modal, 1: sign up, 2: log in
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        token,
        modalState,
        id,
        logout,
        login,
        changeModalState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
