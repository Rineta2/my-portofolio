import { auth, db } from "@/utils/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { parsePhoneNumber } from "libphonenumber-js";

import Cookies from "js-cookie";

export const registerUser = async (formData) => {
  const { email, password, firstName, lastName, phoneNumber } = formData;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(userCredential.user);

  const userData = {
    email: userCredential.user.email,
    firstName,
    lastName,
    phoneNumber: parsePhoneNumber(phoneNumber).formatInternational(),
    role: process.env.NEXT_PUBLIC_ROLE_USERS,
    emailVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    uid: userCredential.user.uid,
    isNewUser: true,
  };

  await setDoc(
    doc(db, process.env.NEXT_PUBLIC_API_USER, userCredential.user.uid),
    userData
  );

  Cookies.set("isNewRegistration", "true", {
    expires: 1 / 24,
    secure: true,
    sameSite: "Strict",
  });

  return userCredential;
};
