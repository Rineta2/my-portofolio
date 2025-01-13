export const revalidate = 0;

import React from "react";

import ArticleCategoryContent from "@/components/hooks/admin/article/category/ArticleCategoryContent";

import { fetchCategories } from "@/components/hooks/admin/article/category/utils/FetchCategory";

export async function generateMetadata() {
  return {
    title: `Article Category Management`,
    description: `Manage article category section content and settings`,
  };
}

export default async function Category() {
  const categories = await fetchCategories();
  return <ArticleCategoryContent categories={categories} />;
}
