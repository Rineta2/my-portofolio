import { toast } from "react-hot-toast";

import { useRegisterForm } from "@/components/hooks/layout/auth/register/utils/useRegisterForm";

import { registerUser } from "@/components/hooks/layout/auth/register/utils/registerService";

import { validateForm } from "@/components/hooks/layout/auth/register/utils/validation";

import RegisterForm from "@/components/hooks/layout/auth/register/RegisterForm";

import styles from "@/components/layout/header/header.module.scss";

export default function Register({ onTabChange }) {
  const { formData, loading, setLoading, handleChange, handlePhoneChange } =
    useRegisterForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm(formData)) {
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Silakan cek email Anda untuk verifikasi akun");
      onTabChange("login");
    } catch (error) {
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "Email sudah terdaftar"
          : "Silakan coba lagi nanti"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.title}>Daftar Akun Baru</h2>
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
