import React from "react";

import StatusContent from "@/components/hooks/admin/users/status/StatusContent";

import { fetchUsers } from "@/components/hooks/admin/users/utils/Fetchusers";

export async function generateMetadata() {
  return {
    title: `Users Status Management`,
    description: `Manage users status section content and settings`,
  };
}

export default async function page() {
  const users = await fetchUsers();
  return <StatusContent users={users} />;
}
