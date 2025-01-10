import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const initialUserState = {
  email: "",
  password: "",
  displayName: "",
  phoneNumber: "",
  role: "users",
};

export function useUserManagement(initialUsers) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");
  const [usersList, setUsersList] = useState(initialUsers || []);
  const [newUser, setNewUser] = useState(initialUserState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const resetModals = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
    setUserToDelete(null);
    setNewUser(initialUserState);
    setError("");
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating new user...");

    try {
      // Store current admin credentials
      const adminEmail = auth.currentUser.email;
      const adminPassword = prompt("Please enter your password to continue");

      if (!adminPassword) {
        toast.error("Admin password required to create new user", {
          id: loadingToast,
        });
        return;
      }

      // Create new user
      const { user: newUserCredential } = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      await updateProfile(newUserCredential, {
        displayName: newUser.displayName,
      });

      const userData = {
        uid: newUserCredential.uid,
        ...newUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        photoURL: null,
      };

      await setDoc(doc(db, "users", newUserCredential.uid), userData);

      // Re-authenticate admin
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

      setUsersList((prev) => [
        ...prev,
        { id: newUserCredential.uid, ...userData },
      ]);
      resetModals();
      toast.success("User created successfully!", { id: loadingToast });
    } catch (error) {
      setError(error.message);
      toast.error(`Failed to create user: ${error.message}`, {
        id: loadingToast,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    const loadingToast = toast.loading("Deleting user...");
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsersList((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!", { id: loadingToast });
      resetModals();
    } catch (error) {
      toast.error("Failed to delete user", { id: loadingToast });
    }
  };

  return {
    showAddModal,
    setShowAddModal,
    error,
    usersList,
    newUser,
    setNewUser,
    showDeleteModal,
    setShowDeleteModal,
    userToDelete,
    setUserToDelete,
    handleAddUser,
    handleDeleteUser,
    resetModals,
  };
}
