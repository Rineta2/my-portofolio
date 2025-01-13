export const revalidate = 0;

import React from "react";

import CategoryContent from "@/components/hooks/admin/project/category/CategoryContent";

import { getCategories } from "@/components/hooks/admin/project/category/utils/CategoryFetch";

export async function generateMetadata() {
  return {
    title: `Category Management`,
    description: `Manage category section content and settings`,
  };
}

export default async function Category() {
  const result = await getCategories();
  const categories = result.success ? result.data : [];

  return <CategoryContent categories={categories} />;
}
