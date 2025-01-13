export const revalidate = 0;

import React from "react";

import UserContent from "@/components/hooks/admin/users/UserContent";

import { fetchUsers } from "@/components/hooks/admin/users/utils/Fetchusers";

export async function generateMetadata() {
  return {
    title: `Users Management`,
    description: `Manage users section content and settings`,
  };
}

export default async function page() {
  const users = await fetchUsers();
  return <UserContent users={users} />;
}
