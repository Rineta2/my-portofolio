"use client";

import React, { useState } from "react";

import { useAuth } from "@/utils/auth/AuthContext";

import AuthModal from "@/components/layout/header/auth/AuthModal";

import styles from "@/app/contact/Contact.module.scss";

import TestimonialsForm from "@/components/hooks/pages/testimonials/TestimonialsForm";

import TestimonialsCard from "@/components/hooks/pages/testimonials/TestimonialsCard";

import { useTestimonials } from "@/components/hooks/pages/testimonials/utils/useTestimonials";

import TestimonialsHeading from "@/components/hooks/pages/testimonials/TestimonialsHeading";

import useModalEffects from "@/components/helpers/useModalEffect";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function TestimonialsClient({
  testimonials: initialTestimonials,
}) {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const { testimonials, submitTestimonial, hasUserSubmitted } =
    useTestimonials(initialTestimonials);

  const handleSubmit = async (formData) => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    const success = await submitTestimonial(formData, user);
    if (success) {
      setShowForm(false);
    }
  };

  const handleAddClick = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    setShowForm(true);
  };

  useModalEffects({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
    user,
  });

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${styles.testimonials__container} ${
        isDarkMode ? styles.dark : styles.light
      } container`}
    >
      <TestimonialsHeading />
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab="login"
        onTabChange={() => {}}
      />
      <div className={styles.content}>
        {testimonials.map((testimonial) => (
          <TestimonialsCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <div className={styles.btn}>
        {!hasUserSubmitted(user?.uid) && (
          <button
            onClick={handleAddClick}
            className={styles.add_testimonial_button}
          >
            {user ? "Add Testimonial" : "Login to Add Testimonial"}
          </button>
        )}
      </div>

      {showForm && user && !hasUserSubmitted(user.uid) && (
        <TestimonialsForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
