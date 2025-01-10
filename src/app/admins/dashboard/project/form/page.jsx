import React from "react";

import FormContent from "@/components/hooks/admin/project/form/FormContent";

export async function generateMetadata({ searchParams }) {
  return {
    title: searchParams.id ? "Edit Project" : "Add Project",
    description: searchParams.id
      ? "Edit existing project"
      : "Create new project",
  };
}

export default async function Form() {
  return <FormContent />;
}
