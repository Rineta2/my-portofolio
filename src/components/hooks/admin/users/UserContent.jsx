"use client";

import React from "react";

import styles from "@/components/hooks/admin/users/user.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

import { useUserManagement } from "@/components/hooks/admin/users/utils/useUserManagement";

import UserCard from "@/components/hooks/admin/users/UserCard";

import UserToolbar from "@/components/hooks/admin/users/UserToolbar";

import AddUserModal from "@/components/hooks/admin/users/AddUserModal";

import DeleteUserModal from "@/components/hooks/admin/users/DeleteUserModal";

import useModalEffects from "@/components/tools/useModalEffect";

export default function UserContent({ users }) {
  const { isDarkMode } = useTheme();
  const {
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
  } = useUserManagement(users);

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewUser({
      email: "",
      password: "",
      displayName: "",
      phoneNumber: "",
      role: "users",
    });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  useModalEffects({ isOpen: showAddModal, onClose: closeAddModal });
  useModalEffects({ isOpen: showDeleteModal, onClose: closeDeleteModal });

  return (
    <section
      className={`${styles.users} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={`${styles.user__container} container`}>
        <UserToolbar onAddClick={() => setShowAddModal(true)} />

        <div className={styles.content}>
          {usersList.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDeleteClick={(user) => {
                setUserToDelete(user);
                setShowDeleteModal(true);
                setShowAddModal(false);
              }}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddUserModal
          showModal={showAddModal}
          onClose={closeAddModal}
          onSubmit={handleAddUser}
          newUser={newUser}
          setNewUser={setNewUser}
          error={error}
        />
      )}

      {showDeleteModal && userToDelete && (
        <DeleteUserModal
          showModal={showDeleteModal}
          user={userToDelete}
          onClose={closeDeleteModal}
          onDelete={handleDeleteUser}
        />
      )}
    </section>
  );
}
