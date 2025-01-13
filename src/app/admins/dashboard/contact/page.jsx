export const revalidate = 0;

import React from "react";

import ContactContent from "@/components/hooks/admin/contact/ContactContent";

import { fetchContact } from "@/components/hooks/admin/contact/utils/FetchContact";

export default async function Contact() {
  const contactData = await fetchContact();

  // Format data sebelum dikirim ke client component
  const formattedContact = contactData.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    message: item.message,
    createdAt: item.createdAt?.seconds ? item.createdAt.seconds * 1000 : null,
  }));

  return <ContactContent contact={formattedContact} />;
}
