import { useState } from "react";

export const useModal = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsActive(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsActive(false);
  };

  return {
    isActive,
    selectedItem,
    openModal,
    closeModal,
  };
};
