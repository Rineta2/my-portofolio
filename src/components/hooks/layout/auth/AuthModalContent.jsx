import React from "react";
import Login from "@/components/layout/header/auth/Login";
import Register from "@/components/layout/header/auth/Register";

export default function AuthModalContent({ activeTab, onClose, onTabChange }) {
  return (
    <>
      {activeTab === "login" ? (
        <Login onClose={onClose} />
      ) : (
        <Register onClose={onClose} onTabChange={onTabChange} />
      )}
    </>
  );
}
