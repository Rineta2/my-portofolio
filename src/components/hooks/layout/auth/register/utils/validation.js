import { isValidPhoneNumber } from "libphonenumber-js";

import { toast } from "react-hot-toast";

import { SENSITIVE_WORDS } from "@/components/hooks/layout/auth/register/utils/constans";

export const containsSensitiveWords = (text) => {
  const lowercaseText = text.toLowerCase();
  return SENSITIVE_WORDS.some((word) => lowercaseText.includes(word));
};

export const validateForm = (formData) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    formData;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !confirmPassword
  ) {
    toast.error("Semua bidang harus diisi");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password dan konfirmasi password tidak cocok");
    return false;
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    toast.error("Nomor telepon tidak valid");
    return false;
  }

  if (containsSensitiveWords(firstName) || containsSensitiveWords(lastName)) {
    toast.error("Nama tidak boleh mengandung kata-kata yang tidak pantas");
    return false;
  }

  return true;
};
