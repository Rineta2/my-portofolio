import React from "react";

import ContactContent from "@/components/hooks/admin/contact/ContactContent";

import { fetchContact } from "@/components/hooks/admin/contact/utils/FetchContact";

export default async function Contact() {
  const contact = await fetchContact();
  return <ContactContent contact={contact} />;
}
