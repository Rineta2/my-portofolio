"use client";
import React from "react";

import LoginForm from "@/components/hooks/layout/auth/login/LoginForm";

import ForgotPasswordForm from "@/components/hooks/layout/auth/login/ForgetPasswordFrom";

import { useState } from "react";

export default function Login({ onClose }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return showForgotPassword ? (
    <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
  ) : (
    <LoginForm
      onClose={onClose}
      setShowForgotPassword={setShowForgotPassword}
    />
  );
}
