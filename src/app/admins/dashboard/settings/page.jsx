export const revalidate = 0;

import React from "react";

import SettingsContent from "@/components/hooks/admin/settings/SettingsContent";

import { Toaster } from "react-hot-toast";

export async function generateMetadata() {
  return {
    title: `Settings Management`,
    description: `Manage settings section content and settings`,
  };
}

export default async function Settings() {
  return (
    <>
      <Toaster />
      <SettingsContent />
    </>
  );
}
